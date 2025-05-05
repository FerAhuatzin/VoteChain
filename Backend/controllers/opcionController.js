const Opcion = require("../models/Opcion");
const mongoose = require('mongoose');

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

exports.obtenerOpciones = async (req, res) => {
  const { id } = req.params;

  let query = { idVotacion: new mongoose.Types.ObjectId(id) };

  try {
    const opciones = await Opcion.find(query);

    if (opciones.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron opciones para esta votación" });
    }

    res.status(200).json(opciones);
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
    res.status(500).json({ error: "Error al obtener las opciones" });
  }
};
