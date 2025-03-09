const mongoose = require('mongoose');

const votacionSchema = new mongoose.Schema({
    idUsuarioCreador: mongoose.Schema.Types.ObjectId,
    titulo: String,
    descripcion: String,
    tipo: String,
    fechaInicio: Date,
    fechaFin: Date,
    estado: { type: String, default: "activa" }
});

module.exports = mongoose.model('Votacion', votacionSchema);
