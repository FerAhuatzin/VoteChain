const Votacion = require('../models/Votacion');

exports.crearVotacion = async (req, res) => {
    const nuevaVotacion = new Votacion(req.body);
    await nuevaVotacion.save();
    res.status(201).json({ mensaje: "Votación creada", votacion: nuevaVotacion });
};

exports.obtenerVotaciones = async (req, res) => {
    const votaciones = await Votacion.find();
    res.status(200).json(votaciones);
};

exports.actualizarVotacion = async (req, res) => {
    const votacionActualizada = await Votacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(votacionActualizada);
};

exports.eliminarVotacion = async (req, res) => {
    await Votacion.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Votación eliminada" });
};
