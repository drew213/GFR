const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

let transactions = [];

app.use(bodyParser.json());

// Endpoint to handle storing wallet addresses
app.post("/api/transactions", (req, res) => {
  const { walletAddress } = req.body;
  transactions.push({ walletAddress, timestamp: new Date() });
  console.log("Wallet address stored:", walletAddress);
  res.status(200).send("Wallet address stored successfully");
});

// Endpoint to retrieve transaction history
app.get("/api/transactions", (req, res) => {
  res.status(200).json(transactions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
