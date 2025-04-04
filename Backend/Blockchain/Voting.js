const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
const dotenv = require('dotenv');
const VotingSystemABI = require('./VotingSystemABI.json');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, VotingSystemABI, wallet);

const domain = {
    name: "VotingSystem",
    version: "1",
    chainId: 11155111, // Sepolia Chain ID
    verifyingContract: process.env.CONTRACT_ADDRESS
};

const types = {
    Vote: [
        { name: "candidateId", type: "uint256" },
        { name: "voter", type: "address" }
    ]
};

app.post('/vote', async (req, res) => {
    try {
        const { candidateId, voter, signature } = req.body;

        const signer = ethers.utils.verifyTypedData(domain, types, { candidateId, voter }, signature);
        if (signer.toLowerCase() !== voter.toLowerCase()) {
            return res.status(400).json({ error: "Invalid signature" });
        }

        const tx = await contract.vote(candidateId, voter, signature);
        await tx.wait();

        res.json({ message: "Vote successfully submitted", txHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Transaction failed" });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
