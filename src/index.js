import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <UseWalletProvider
          chainId={97} // bản use-wallet mới nhất không có cái này nữa
          connectors={{
            walletconnect: {
              rpcUrl: "https://data-seed-prebsc-2-s2.binance.org:8545",
              bridge: "https://uniswap.bridge.walletconnect.org",
            },
          }}
        >
          <App />
        </UseWalletProvider>
      </Provider>
    </Router>
  </StrictMode>,
  rootElement
);
