const mongoose = require('mongoose');

const VotoSchema = new mongoose.Schema({
  idVotacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Votacion', required: true },
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  txHash: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Voto', VotoSchema);
