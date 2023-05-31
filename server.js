const express = require("express");
const cors = require("cors");

const { encrypt, nonce } = require("solana-encryption");
const Keypair = require('@solana/web3.js').Keypair;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/encrypt-message", (req, res) => {
  try {
    const messageForEncryption = req.body.message;

    // Generate two random key pairs
    const keypairA = Keypair.generate();
    const keypairB = Keypair.generate();

    // Get the public and private keys from the keypairs
    const privateKey_sender = keypairA.secretKey;
    const publicKey_receiver = keypairB.publicKey.toBase58();

    // Generate a nonce
    const newNonce = nonce();

    const encrypted = encrypt(
      messageForEncryption,
      newNonce,
      publicKey_receiver,
      privateKey_sender
    );

    res.json(encrypted);
  } catch (err) {
    console.error(err);
    res.send('Something went wrong');
  }
});

app.listen(5000, () => {
    console.log("Listen on the port 5000...");
});