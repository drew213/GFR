import React, { useEffect, useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const WalletSelectionPage = () => {
  const [connector, setConnector] = useState(null);

  useEffect(() => {
    initializeWalletConnect().then(setConnector);

    return () => {
      connector?.killSession().then(() => console.log("Session ended"));
    };
  }, []);

  async function initializeWalletConnect() {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      await connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        console.error("Connection error:", error);
        return;
      }

      const { accounts, chainId } = payload.params[0];
      console.log(`Connected with accounts: ${accounts}, chainId: ${chainId}`);
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        console.error("Session update error:", error);
        return;
      }

      const { accounts, chainId } = payload.params[0];
      console.log(
        `Session updated with accounts: ${accounts}, chainId: ${chainId}`
      );
    });

    return connector;
  }

  async function sendTransaction(tx) {
    if (!connector) {
      console.log("WalletConnect not initialized");
      return;
    }

    try {
      const result = await connector.sendTransaction(tx);
      console.log("Transaction successful with result:", result);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  }

  // You can trigger this function on a button click or form submit
  const handleSendTransaction = async () => {
    const tx = {
      // Example transaction details
      from: "YOUR_ACCOUNT_ADDRESS",
      to: "RECIPIENT_ADDRESS",
      data: "0x",
      gasPrice: "0x09184e72a000",
      gas: "0x2710",
      value: "0x00",
      nonce: "0x0",
    };

    await sendTransaction(tx);
  };

  return (
    <div>
      <h1>Wallet Selection Page</h1>
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  );
};

export default WalletSelectionPage;
