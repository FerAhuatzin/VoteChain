const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());

// Conectar a MongoDB (cambia la URL si usas un servidor en la nube)
mongoose.connect('mongodb://admin:admin@129.146.38.202:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir modelos
const Usuario = mongoose.model('usuario', new mongoose.Schema({
    nombre: String,
    email: String,
    contraseña: String,
    fechaRegistro: Date
}));

const Votacion = mongoose.model('votaciones', new mongoose.Schema({
    idUsuarioCreador: mongoose.Schema.Types.ObjectId,
    titulo: String,
    descripcion: String,
    tipo: String,
    fechaInicio: Date,
    fechaFin: Date,
    estado: String
}));

//Endpoint para crear una votación
app.post('/crear-votacion', async (req, res) => {
    try {
        const { emailUsuario, titulo, descripcion, tipo, fechaInicio, fechaFin } = req.body;
        
        // Buscar usuario en MongoDB
        const usuario = await Usuario.findOne({ email: emailUsuario });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Crear la votación con el ID del usuario
        const nuevaVotacion = new Votacion({
            idUsuarioCreador: usuario._id,
            titulo,
            descripcion,
            tipo,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
            estado: "activa"
        });

        await nuevaVotacion.save();
        res.status(201).json({ mensaje: "Votación creada exitosamente", votacion: nuevaVotacion });

    } catch (error) {
        res.status(500).json({ error: "Error al crear la votación" });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
