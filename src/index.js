import React from 'react';
import ReactDOM from 'react-dom';
import './assets/tailwind.output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletConnectContextProvider } from "@cityofzion/wallet-connect-sdk-react";

const wcOptions = {
  chainId: "neo3:testnet", // blockchain and network identifier
  logger: "debug", // use debug to show all log information on browser console
  methods: ["invokefunction","testInvoke"], // which RPC methods do you plan to call
  relayServer: "wss://relay.walletconnect.org", // we are using walletconnect's official relay server 
  appMetadata: {
    name: "NEO dApp Boilerplate", // your application name to be displayed on the wallet
    description: "NEO dApp Boilerplate", // description to be shown on the wallet
    url: "https://neo.org/", // url to be linked on the wallet
    icons: ["https://cryptologos.cc/logos/neo-neo-logo.svg"], // icon to be shown on the wallet
  }
};


ReactDOM.render(

  <React.StrictMode>
    <WalletConnectContextProvider options={wcOptions}>
      <App />
    </WalletConnectContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
