import React, { createContext, useContext, useState } from "react";
import { initializeConnector } from "../components/WalletConnectSetup";

const WalletConnectContext = createContext();

export const WalletConnectProvider = ({ children }) => {
  const [connector, setConnector] = useState(null);

  const connectWallet = async () => {
    const connectorInstance = await initializeConnector();
    setConnector(connectorInstance);
  };

  return (
    <WalletConnectContext.Provider value={{ connector, connectWallet }}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);
