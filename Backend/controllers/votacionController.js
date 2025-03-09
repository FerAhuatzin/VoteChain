const Votacion = require('../models/Votacion');

exports.crearVotacion = async (req, res) => {
    try {
        const { idUsuarioCreador, titulo, descripcion, tipo, fechaInicio, fechaFin } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!idUsuarioCreador || !titulo || !descripcion || !tipo || !fechaInicio || !fechaFin) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevaVotacion = new Votacion({
            idUsuarioCreador,
            titulo,
            descripcion,
            tipo,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
            estado: "activa"
        });

        await nuevaVotacion.save();
        res.status(201).json({ mensaje: "✅ Votación creada exitosamente", votacion: nuevaVotacion });

    } catch (error) {
        console.error("❌ Error al crear la votación:", error);
        res.status(500).json({ error: "Error interno al crear la votación", detalle: error.message });
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
