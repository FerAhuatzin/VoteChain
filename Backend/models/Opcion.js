const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    idVotacion: {type: mongoose.Schema.Types.ObjectId, ref: 'idVotacion', required: true }
}, { collection: 'opciones', timestamps: true });

module.exports = mongoose.model('Opcion', opcionSchema);