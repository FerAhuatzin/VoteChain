const mongoose = require('mongoose');

const invitacionSchema = new mongoose.Schema({
    idVotacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Votacion', required: true },
    idUsuarioInvitado: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: String, default: "pendiente" }
}, { collection: 'invitaciones' }); // 🔹 Especificamos la colección

module.exports = mongoose.model('Invitacion', invitacionSchema, 'invitaciones');
