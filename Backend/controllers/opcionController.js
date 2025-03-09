const Opcion = require('../models/Opcion');

exports.crearOpcion = async (req, res) => {
    try {
        const { idVotacion, descripcion } = req.body;

        const nuevaOpcion = new Opcion({ idVotacion, descripcion });
        await nuevaOpcion.save();

        res.status(201).json({ mensaje: "Opción creada", opcion: nuevaOpcion });
    } catch (error) {
        res.status(500).json({ error: "Error al crear opción" });
    }
};
