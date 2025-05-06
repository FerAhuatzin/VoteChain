const mongoose = require('mongoose');

const votacionSchema = new mongoose.Schema({
    idUsuarioCreador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    emailUsuario: { 
        type: String,
        trim: true,
        required: true,
        match: /.+\@.+\..+/
    },
    titulo: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 3
    },
    descripcion: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 5
    },
    tipo: { 
        type: String, 
        enum: ["privada", "publica"], 
        required: true 
    },
    fechaInicio: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    fechaFin: { 
        type: Date, 
        required: true 
    },
    imagen: { 
        type: String,
        default: null 
    },
    estado: { 
        type: String, 
        enum: ["activa", "finalizada", "cancelada"], 
        default: "activa" 
    },

    categorias: {
        type: [String],
        enum: ["cine", "deportes", "economia", "tecnologia", "politica", "ambiente", "educacion", "musica"],
        default: []
    },

    opciones: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Opcion'  // <--- Asegúrate de que este sea el nombre exacto del modelo de opciones
    }]
}, { collection: 'votaciones', timestamps: true });

module.exports = mongoose.model('Votacion', votacionSchema);