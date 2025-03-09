const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema({
    idVotacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Votacion', required: true },
    idOpcion: { type: mongoose.Schema.Types.ObjectId, ref: 'Opcion', required: true },
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fechaVoto: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Voto', votoSchema);
