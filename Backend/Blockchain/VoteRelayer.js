require('dotenv').config();
const { ethers } = require('ethers');
const axios = require('axios');

const RELAYER_ADDRESS = process.env.RELAYER_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/TU_INFURA_API_KEY');
