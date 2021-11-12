import React, { useContext, useEffect, useState } from 'react';
import Web3EthContract from "web3-eth-contract";
import { fetchJson } from '../helpers/Files';

const ContractContext = React.createContext();

export function useContract() {
    return useContext(ContractContext);
}

export function ContractProvider({ children }) {
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [imageURIs, setImageURIs] = useState([]);

    useEffect(async () => {
        const smartContract = await initContract();
        const _totalSupply = await getTotalSupply(smartContract);

        setTotalSupply(_totalSupply);
        setMaxSupply(await getMaxSupply(smartContract));
        setImageURIs(await getImageURIs(smartContract, _totalSupply));
    }, []);

    const initContract = async () => {
        const abi = await fetchJson("/config/abi.json");
        const config = await fetchJson("/config/config.json");
        
        Web3EthContract.setProvider(config.NETWORK_PROVIDER);
        return new Web3EthContract(abi, config.CONTRACT_ADDRESS);
    }

    const getTotalSupply = async (smartContract) => {
        return await smartContract
            .methods
            .totalSupply()
            .call();
    }

    const getMaxSupply = async (smartContract) => {
        return await smartContract
            .methods
            .maxSupply()
            .call();
    }

    const getImageURIs = async (smartContract, totalSupply) => {
        let imageURIs = []

        for (let i = totalSupply; i >= (totalSupply - 2); i--) {
            let tokenURI = await smartContract
                .methods
                .tokenURI(`${i}`)
                .call();

            let trimmedTokenURI = tokenURI.replace("://", "/");
            let res = await fetch('https://millionlion.mypinata.cloud/' + trimmedTokenURI);
            let metadata = await res.json();
            let trimmedImagedURI = metadata.image.replace("://", "/");

            imageURIs[i] = 'https://millionlion.mypinata.cloud/' + trimmedImagedURI;
        }

        return imageURIs
    }

    const value = {
        totalSupply,
        imageURIs,
        maxSupply
    }

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}
