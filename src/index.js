import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { ContractProvider } from './contexts/ContractContext';
import { Provider } from "react-redux";
import "./styles/reset.css";

ReactDOM.render(
  <ContractProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContractProvider>,
  document.getElementById("root")
);
