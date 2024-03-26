// WalletConnectSetup.js
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const initializeConnector = () => {
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

  if (!connector.connected) {
    connector.createSession();
  }

  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    const { accounts, chainId } = payload.params[0];
    console.log("Connected accounts and chainId:", accounts, chainId);
    // Additional logic upon successful connection
  });

  connector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    const { accounts, chainId } = payload.params[0];
    console.log("Session updated accounts and chainId:", accounts, chainId);
    // Handle session updates here
  });

  return connector;
};
