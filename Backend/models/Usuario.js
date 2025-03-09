const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    email: { type: String, unique: true },
    contraseña: String,
    fechaRegistro: { type: Date, default: Date.now }
}, { collection: 'usuarios' }); // 🔹 Especificamos la colección

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios');
