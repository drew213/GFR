import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { WalletConnectContext } from "./context/WalletConnectContext
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

ReactDOM.render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
  document.getElementById("root")
);
