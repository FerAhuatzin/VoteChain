const Voto = require('../models/Voto');
const Opcion = require('../models/Opcion');
const mongoose = require('mongoose');

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

exports.obtenerVotosPorVotacion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const objectId = new mongoose.Types.ObjectId(id);
  
      const votosPorOpcion = await Voto.aggregate([
        {
          $match: { idVotacion: objectId }
        },
        {
          $group: {
            _id: "$idOpcion",
            totalVotos: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "opciones",
            localField: "_id",
            foreignField: "_id",
            as: "opcion"
          }
        },
        {
          $unwind: "$opcion"
        },
        {
          $project: {
            _id: 0,
            opcionId: "$opcion._id",
            descripcion: "$opcion.descripcion",
            totalVotos: 1
          }
        }
      ]);
  
      if (votosPorOpcion.length === 0) {
        return res.status(404).json({ message: "No se encontraron votos para esta votación" });
      }
  
      res.status(200).json(votosPorOpcion);
    } catch (error) {
      console.error("Error al obtener los votos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };