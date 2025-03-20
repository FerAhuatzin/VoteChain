const Votacion = require('../models/Votacion');
const Usuario = require('../models/Usuario');
const { v2: cloudinary } = require("cloudinary");

// Crear votación con imagen
exports.crearVotacion = async (req, res) => {
    try {
        // 🔹 Asegurar que los datos lleguen bien, ya sea en JSON o Form-Data
        let emailUsuario = req.body.emailUsuario || req.body["emailUsuario"];
        let titulo = req.body.titulo || req.body["titulo"];
        let descripcion = req.body.descripcion || req.body["descripcion"];
        let tipo = req.body.tipo || req.body["tipo"];
        let fechaInicio = req.body.fechaInicio || req.body["fechaInicio"];
        let fechaFin = req.body.fechaFin || req.body["fechaFin"];

        if (!emailUsuario) {
            return res.status(400).json({ error: "emailUsuario es requerido" });
        }

        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ email: emailUsuario });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Subir imagen a Cloudinary si se proporciona
        let imagenUrl = null;
        if (req.file) {
            const resultado = await cloudinary.uploader.upload(req.file.path, { folder: "votaciones" });
            imagenUrl = resultado.secure_url;
        }

        const nuevaVotacion = new Votacion({
            idUsuarioCreador: usuario._id,
            titulo,
            descripcion,
            tipo,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
            imagen: imagenUrl, // Guardamos la URL de Cloudinary
            estado: "activa"
        });

        await nuevaVotacion.save();
        res.status(201).json({ mensaje: "Votación creada exitosamente", votacion: nuevaVotacion });

    } catch (error) {
        console.error("Error al crear la votación:", error);
        res.status(500).json({ error: "Error interno al crear la votación" });
    }
};

exports.obtenerVotaciones = async (req, res) => {
    try {
        const votaciones = await Votacion.find();
        res.status(200).json(votaciones);
    } catch (error) {
        console.error("❌ Error al obtener votaciones:", error);
        res.status(500).json({ error: "Error interno al obtener votaciones" });
    }
};

exports.actualizarVotacion = async (req, res) => {
    try {
        const { id } = req.params;
        const votacionActualizada = await Votacion.findByIdAndUpdate(id, req.body, { new: true });

        if (!votacionActualizada) {
            return res.status(404).json({ error: "❌ Votación no encontrada" });
        }

        res.status(200).json({ mensaje: "✅ Votación actualizada", votacion: votacionActualizada });
    } catch (error) {
        console.error("❌ Error al actualizar votación:", error);
        res.status(500).json({ error: "Error interno al actualizar la votación" });
    }
};

exports.eliminarVotacion = async (req, res) => {
    try {
        const { id } = req.params;
        const votacionEliminada = await Votacion.findByIdAndDelete(id);

        if (!votacionEliminada) {
            return res.status(404).json({ error: "❌ Votación no encontrada" });
        }

        res.status(200).json({ mensaje: "✅ Votación eliminada" });
    } catch (error) {
        console.error("❌ Error al eliminar votación:", error);
        res.status(500).json({ error: "Error interno al eliminar la votación" });
    }
};