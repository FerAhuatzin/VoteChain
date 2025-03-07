const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para usar variables de entorno

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Ajusta según tus necesidades de seguridad
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Conectar a MongoDB usando variables de entorno
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:admin@129.146.38.202:27017/';
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Definir modelos
const Usuario = mongoose.model('usuario', new mongoose.Schema({
    nombre: String,
    email: String,
    contraseña: String,
    fechaRegistro: { type: Date, default: Date.now }
}));

const Votacion = mongoose.model('votaciones', new mongoose.Schema({
    idUsuarioCreador: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
    titulo: String,
    descripcion: String,
    tipo: String,
    fechaInicio: Date,
    fechaFin: Date,
    estado: { type: String, default: 'activa' }
}));

// Endpoint para crear una votación
app.post('/crear-votacion', async (req, res) => {
    try {
        const { emailUsuario, titulo, descripcion, tipo, fechaInicio, fechaFin } = req.body;

        if (!emailUsuario || !titulo || !descripcion || !tipo || !fechaInicio || !fechaFin) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const usuario = await Usuario.findOne({ email: emailUsuario });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const nuevaVotacion = new Votacion({
            idUsuarioCreador: usuario._id,
            titulo,
            descripcion,
            tipo,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
        });

        await nuevaVotacion.save();
        res.status(201).json({ mensaje: "Votación creada exitosamente", votacion: nuevaVotacion });

    } catch (error) {
        console.error("Error en /crear-votacion:", error);
        res.status(500).json({ error: "Error al crear la votación" });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
console.log(app._router.stack.map(r => r.route?.path).filter(Boolean));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://129.146.38.202:${PORT}`);
});
