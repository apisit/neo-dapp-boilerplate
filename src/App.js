import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from "react"

import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { WcSdk } from "@cityofzion/wallet-connect-sdk-core/lib";
import Home from './views/Home';
import Transfer from "./views/Transfer";
import SmartContract from "./views/SmartContract";


function App() {

  const walletConnectCtx = useWalletConnect()


  if (walletConnectCtx.loadingSession) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">loading...</p>
      </div>
    )
  }



  return (
    <Router>
      <Switch>

        <Route path="/smartcontract"
          render={(props) => (
            <SmartContract {...props} />
          )}
        />
        <Route path="/transfer"
          render={(props) => (
            <Transfer {...props} />
          )}
        />
        <Route path="/"
          render={(props) => (
            <Home {...props} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
