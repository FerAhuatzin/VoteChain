const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema({
    idVotacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Votacion', required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Opcion', opcionSchema);
