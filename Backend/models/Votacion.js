const mongoose = require('mongoose');

const votacionSchema = new mongoose.Schema({
    idUsuarioCreador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    emailUsuario: { // 🔹 No se almacena en el controller, pero si se quiere guardar
        type: String,
        trim: true
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
        required: true,
        default: Date.now // 🔹 Se asegura que siempre tenga un valor
    },
    fechaFin: { 
        type: Date, 
        required: true 
    },
    imagen: { 
        type: String, // 🔹 URL de la imagen en Cloudinary
        default: null 
    },
    estado: { 
        type: String, 
        enum: ["activa", "finalizada", "cancelada"], 
        default: "activa" 
    }
}, { collection: 'votaciones' }); // 🔹 Especificar la colección aquí

module.exports = mongoose.model('Votacion', votacionSchema, 'votaciones');
