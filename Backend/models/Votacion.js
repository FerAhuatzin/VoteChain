const mongoose = require('mongoose');

const votacionSchema = new mongoose.Schema({
    idUsuarioCreador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    titulo: { 
        type: String, 
        required: true, 
        trim: true 
    },
    descripcion: { 
        type: String, 
        required: true, 
        trim: true 
    },
    tipo: { 
        type: String, 
        enum: ["privada", "publica"], 
        required: true 
    },
    fechaInicio: { 
        type: Date, 
        required: true 
    },
    fechaFin: { 
        type: Date, 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ["activa", "finalizada", "cancelada"], 
        default: "activa" 
    }
}, { collection: 'votaciones' }); // 🔹 Especificar la colección aquí

module.exports = mongoose.model('Votacion', votacionSchema, 'votaciones');

