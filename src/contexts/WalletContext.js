import React, { useContext, useState } from 'react';
import Web3EthContract from "web3-eth-contract";
import { fetchJson } from '../helpers/Files';

const WalletContext = React.createContext();

export function useWallet() {
    return useContext(WalletContext);
}

export function WalletProvider({ children }) {
    const [smartContract, setSmartContract] = useState({});
    const [account, setAccount] = useState("");
    const [message, setMessage] = useState("Click buy to mint your NFT.");
    const [errorMessage, setErrorMessage] = useState("");
    const [isMinting, setIsMinting] = useState(false);

    const connect = async () => {
        const abi = await fetchJson("/config/abi.json");
        const config = await fetchJson("/config/config.json");

        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

        if (!metamaskIsInstalled) {
            setErrorMessage("Install Metamask.");
            
            return;
        }

        Web3EthContract.setProvider(ethereum);
        const _smartContract = new Web3EthContract(abi, config.CONTRACT_ADDRESS);

        setSmartContract(_smartContract);

        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const networkId = await ethereum.request({ method: "net_version" });

            if (networkId != config.NETWORK.ID) {
                errorMessage(`Change network to ${config.NETWORK.NAME}.`);

                return;
            }

            setAccount(accounts[0]);
            
            ethereum.on("accountsChanged", (accounts) => { setAccount(accounts[0]); });
            ethereum.on("chainChanged", () => { window.location.reload(); });
        } catch (err) {
            errorMessage("Something went wrong.");
        }
    }

    const mint = async () => {
        const config = await fetchJson("/config/config.json");
        let costWei = config.WEI_COST;
        let gasLimit = config.GAS_LIMIT;

        console.log("Cost: ", costWei);
        console.log("Gas limit: ", gasLimit);

        setMessage(`Minting your ${config.NFT_NAME}...`);
        setIsMinting(true);

        smartContract.methods
            .mint(1)
            .send({
                gasLimit: gasLimit,
                to: config.CONTRACT_ADDRESS,
                from: account,
                value: costWei,
            })
            .once("error", (err) => {
                console.log(err);
                setMessage("Sorry, something went wrong please try again later.");
                setIsMinting(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setMessage(`The ${config.NFT_NAME} is yours! go visit Opensea.io to view it.`);
                setIsMinting(false);

                // TODO: refresh data
            });
    }

    const value = {
        account,
        errorMessage,
        message,
        isMinting,
        connect,
        mint
    }

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext;