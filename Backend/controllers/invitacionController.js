const Invitacion = require('../models/Invitacion');

exports.crearInvitacion = async (req, res) => {
    try {
        const { idVotacion, idUsuarioInvitado, estado } = req.body;

        const nuevaInvitacion = new Invitacion({ idVotacion, idUsuarioInvitado, estado });
        await nuevaInvitacion.save();

        res.status(201).json({ mensaje: "Invitación creada", invitacion: nuevaInvitacion });
    } catch (error) {
        console.error("❌ Error al crear invitación:", error);
        res.status(500).json({ error: "Error al crear invitación", detalle: error.message });
    }
};

exports.obtenerInvitaciones = async (req, res) => {
    try {
        const invitaciones = await Invitacion.find();
        res.status(200).json(invitaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener invitaciones" });
    }
};

exports.actualizarInvitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const invitacion = await Invitacion.findByIdAndUpdate(id, { estado }, { new: true });

        if (!invitacion) return res.status(404).json({ error: "Invitación no encontrada" });

        res.status(200).json({ mensaje: "Invitación actualizada", invitacion });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar invitación" });
    }
};
