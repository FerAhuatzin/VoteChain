const { DefenderRelayProvider, DefenderRelaySigner } = require("defender-relay-client/lib/ethers");
const { ethers } = require("ethers");
require("dotenv").config();

// ABI del contrato VotingSystem
const contractAbi = require("../abi/VotingSystem.json");


const contractAddress = process.env.CONTRACT_ADDRESS;

const credentials = {
  apiKey: process.env.DEFENDER_API_KEY,
  apiSecret: process.env.DEFENDER_API_SECRET,
};

const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, { speed: "fast" });

const contract = new ethers.Contract(contractAddress, contractAbi, signer);

exports.voteHandler = async (req, res) => {
  try {
    const { candidateId, voter, signature } = req.body;

    console.log("Intentando votar:", candidateId, voter, signature);

    const tx = await contract.vote(candidateId, voter, signature);

    // NO uses await tx.wait() — causa error con defender
    console.log("Voto enviado. TX Hash:", tx.hash);

    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Error completo:", err);
    res.status(500).json({ error: "Error al procesar el voto" });
  }
};
