const Votacion = require('../models/Votacion');
const Usuario = require('../models/Usuario');

exports.crearVotacion = async (req, res) => {
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
            estado: "activa"
        });

        await nuevaVotacion.save();
        res.status(201).json({ mensaje: "Votación creada exitosamente", votacion: nuevaVotacion });

    } catch (error) {
        console.error("❌ Error al crear votación:", error);
        res.status(500).json({ error: "Error al crear la votación", detalle: error.message });
    }
};
