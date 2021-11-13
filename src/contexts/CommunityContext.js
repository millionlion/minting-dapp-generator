import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { fetchJson } from '../helpers/Files';

const CommunityContext = React.createContext();

export function useCommunity() {
    return useContext(CommunityContext);
}

export function CommunityProvider({ children }) {
    const [walletBalance, setWalletBalance] = useState();

    useEffect(async () => {
        getWalletBalance();
    }, []);
    
    const getWalletBalance = async () => {
        const config = await fetchJson("/config/config.json");
        const web3 = new Web3(config.NETWORK_PROVIDER);

        let balance = await web3.eth.getBalance("0xbd5611F9B5f2808AE9e1d58e825Dc58f822bAbF6");
        console.log(Number(balance) * 0.000000000000000001);
        setWalletBalance(Number(balance) * 0.000000000000000001);
    }

    const value = {
        walletBalance
    }

    return (
        <CommunityContext.Provider value={value}>
            {children}
        </CommunityContext.Provider>
    )
}