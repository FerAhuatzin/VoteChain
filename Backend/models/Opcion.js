const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema({
    idVotacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Votacion', required: true },
    descripcion: { type: String, required: true }
}, { collection: 'opciones' }); // 🔹 Especificamos la colección

module.exports = mongoose.model('Opcion', opcionSchema, 'opciones');
