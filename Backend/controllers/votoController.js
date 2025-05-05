const Voto = require('../models/Voto');
const Opcion = require('../models/Opcion');
const mongoose = require('mongoose');

const { DefenderRelayProvider } = require("defender-relay-client/lib/ethers");
const { ethers } = require("ethers");
require("dotenv").config();

const credentials = {
  apiKey: process.env.DEFENDER_API_KEY,
  apiSecret: process.env.DEFENDER_API_SECRET,
};

const provider = new DefenderRelayProvider(credentials);
const contractAbi = require("../abi/VotingSystem.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const readContract = new ethers.Contract(contractAddress, contractAbi, provider);

exports.crearVoto = async (req, res) => {
  try {
    const { idVotacion, idOpcion, idUsuario, voter, signature } = req.body;

    if (!voter || !signature || !idOpcion) {
      return res.status(400).json({ error: "Se requiere 'voter', 'signature' y 'idOpcion'" });
    }

    // Convertir idOpcion (Mongo ObjectId) a bytes32
    const opcionBytes32 = ethers.utils.hexZeroPad("0x" + idOpcion, 32);

    // Enviar la transacción a blockchain
    const tx = await readContract.connect(provider.getSigner()).vote(opcionBytes32, voter, signature);

    console.log("Voto enviado a blockchain. TX Hash:", tx.hash);

    // Guardar en MongoDB
    const nuevoVoto = new Voto({
      idVotacion,
      idOpcion,   // guardamos el ObjectId original
      idUsuario,
      txHash: tx.hash,
    });

    await nuevoVoto.save();

    res.status(201).json({ mensaje: "Voto registrado", voto: nuevoVoto });

  } catch (error) {
    console.error("Error al registrar voto:", error);
    res.status(500).json({ error: "Error al registrar voto" });
  }
};



exports.obtenerVotosPorVotacion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const objectId = new mongoose.Types.ObjectId(id);
  
      const votosPorOpcion = await Voto.aggregate([
        {
          $match: { idVotacion: objectId }
        },
        {
          $group: {
            _id: "$idOpcion",
            totalVotos: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "opciones",
            localField: "_id",
            foreignField: "_id",
            as: "opcion"
          }
        },
        {
          $unwind: "$opcion"
        },
        {
          $project: {
            _id: 0,
            opcionId: "$opcion._id",
            descripcion: "$opcion.descripcion",
            totalVotos: 1
          }
        }
      ]);
  
      if (votosPorOpcion.length === 0) {
        return res.status(404).json({ message: "No se encontraron votos para esta votación" });
      }
  
      res.status(200).json(votosPorOpcion);
    } catch (error) {
      console.error("Error al obtener los votos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
};

// NUEVA FUNCIÓN: obtenerVotoPorTxHash
exports.obtenerVotoPorTxHash = async (req, res) => {
  try {
    const { txHash } = req.params;

    console.log("Buscando información de la transacción:", txHash);

    const tx = await provider.getTransaction(txHash);

    if (!tx || !tx.data) {
      return res.status(404).json({ error: "No se encontró la transacción o no contiene datos" });
    }

    const iface = new ethers.utils.Interface(contractAbi);

    // Decodeamos el input
    const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });

    if (decoded.name !== "vote") {
      return res.status(400).json({ error: "La transacción no es de tipo 'vote'" });
    }

    const { candidateId, voter, signature } = decoded.args;

    const block = await provider.getBlock(tx.blockNumber);

    return res.status(200).json({
      candidateId: candidateId.toString(),
      voter: voter,
      signature: signature,
      txHash: txHash,
      blockNumber: tx.blockNumber,
      timestamp: block.timestamp,
    });

  } catch (error) {
    console.error("Error al decodificar la transacción:", error);
    return res.status(500).json({ error: "Error interno al buscar la transacción" });
  }
};

const getTxHashesByVotacion = async (idVotacion) => {
  const votos = await Voto.find({ idVotacion }, { txHash: 1, _id: 0 });
  return votos.map(v => v.txHash);
};

const getCandidateIdFromTx = async (txHash, provider, contractAbi) => {
  const tx = await provider.getTransaction(txHash);
  const iface = new ethers.utils.Interface(contractAbi);

  const decoded = iface.parseTransaction({ data: tx.data, value: tx.value });
  if (decoded.name !== "vote") {
    throw new Error(`La transacción ${txHash} no es un voto`);
  }

  // Convertir a hex limpio
  const rawCandidateId = decoded.args.candidateId.toString();
  const hexCandidateId = ethers.BigNumber.from(rawCandidateId).toHexString().replace(/^0x0*/, '');

  return hexCandidateId;  // devuelve el ObjectId en formato Mongo
};



const countVotesByCandidate = (candidateIds) => {
  const counts = {};

  for (const id of candidateIds) {
    counts[id] = (counts[id] || 0) + 1;
  }

  return counts;
};

exports.obtenerConteoPorOpcion = async (req, res) => {
  try {
    const { idVotacion } = req.params;

    // Paso 1: Obtener txHash desde Mongo
    const txHashes = await getTxHashesByVotacion(idVotacion);

    if (txHashes.length === 0) {
      return res.status(404).json({ message: "No se encontraron votos para esta votación" });
    }

    // Paso 2: Leer blockchain por cada txHash
    const candidateIds = [];
    for (const txHash of txHashes) {
      try {
        const candidateId = await getCandidateIdFromTx(txHash, provider, contractAbi);
        candidateIds.push(candidateId);
      } catch (err) {
        console.warn(`Error al procesar tx ${txHash}:`, err.message);
      }
    }

    // Paso 3: Contar votos por opción
    const result = countVotesByCandidate(candidateIds);

    res.status(200).json(result);

  } catch (error) {
    console.error("Error al obtener conteo por opción:", error);
    res.status(500).json({ error: "Error interno al contar votos" });
  }
};
