const Voto = require('../models/Voto');

exports.crearVoto = async (req, res) => {
    try {
        const { idVotacion, idOpcion, idUsuario } = req.body;

        const nuevoVoto = new Voto({ idVotacion, idOpcion, idUsuario });
        await nuevoVoto.save();

        res.status(201).json({ mensaje: "Voto registrado", voto: nuevoVoto });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar voto" });
    }
};
