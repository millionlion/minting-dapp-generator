import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContractProvider } from './contexts/ContractContext';
import { WalletProvider } from "./contexts/WalletContext";
import { CommunityProvider } from "./contexts/CommunityContext";
import "./styles/reset.css";

ReactDOM.render(
  <ContractProvider>
    <WalletProvider>
      <CommunityProvider>
        <App />
      </CommunityProvider>
    </WalletProvider>
  </ContractProvider>,
  document.getElementById("root")
);
