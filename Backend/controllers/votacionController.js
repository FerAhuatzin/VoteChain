const Votacion = require("../models/Votacion");
const Usuario = require("../models/Usuario");
const Voto = require("../models/Voto");
const Opcion = require('../models/Opcion');
const mongoose = require('mongoose');
const { v2: cloudinary } = require("cloudinary");

exports.crearVotacion = async (req, res) => {
  try {
    const {
      emailUsuario,
      titulo,
      descripcion,
      tipo,
      fechaInicio,
      fechaFin,
      opciones,    // array
      categorias   
    } = req.body;

    if (!emailUsuario || !opciones || opciones.length === 0) {
      return res.status(400).json({ error: "emailUsuario y opciones son requeridos" });
    }

    // Si viene como string JSON (porque lo mandas como formData), conviértelo a array
    let categoriasArray = categorias;
    if (typeof categorias === 'string') {
      try {
        categoriasArray = JSON.parse(categorias);
      } catch (err) {
        return res.status(400).json({ error: "Las categorías enviadas no son un JSON válido" });
      }
    }

    if (!Array.isArray(categoriasArray)) {
      return res.status(400).json({ error: "categorias debe ser un arreglo" });
    }

    categoriasArray = categoriasArray.map(c =>
      c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    );

    const usuario = await Usuario.findOne({ email: emailUsuario });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    let imagenUrl = null;
    if (req.file) {
      const resultado = await cloudinary.uploader.upload(req.file.path, {
        folder: "votaciones",
      });
      imagenUrl = resultado.secure_url;
    } else if (req.body.imagen) {
      imagenUrl = req.body.imagen;
    }

    const nuevaVotacion = new Votacion({
      idUsuarioCreador: usuario._id,
      emailUsuario,
      titulo,
      descripcion,
      tipo,
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
      imagen: imagenUrl,
      estado: "activa",
      categorias: categoriasArray,  // ← agregamos aquí
    });

    const savedVotacion = await nuevaVotacion.save();

    let opcionesArray = opciones;
    if (typeof opciones === 'string') {
      try {
        opcionesArray = JSON.parse(opciones);
      } catch (err) {
        return res.status(400).json({ error: "Las opciones enviadas no son un JSON válido" });
      }
    }

    if (!Array.isArray(opcionesArray) || opcionesArray.length === 0) {
      return res.status(400).json({ error: "opciones debe ser un arreglo no vacío" });
    }

    const opcionesDocs = opcionesArray.map(opcion => ({
      idVotacion: savedVotacion._id,
      descripcion: opcion
    }));

    await Opcion.insertMany(opcionesDocs);

    res.status(201).json({
      mensaje: "Votación y opciones creadas exitosamente",
      votacion: savedVotacion,
    });

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
    console.error("Error al obtener votaciones:", error);
    res.status(500).json({ error: "Error interno al obtener votaciones" });
  }
};

exports.actualizarVotacion = async (req, res) => {
  try {
    const { id } = req.params;
    const votacionActualizada = await Votacion.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!votacionActualizada) {
      return res.status(404).json({ error: "Votación no encontrada" });
    }

    res.status(200).json({
      mensaje: "Votación actualizada",
      votacion: votacionActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar votación:", error);
    res.status(500).json({ error: "Error interno al actualizar la votación" });
  }
};

exports.eliminarVotacion = async (req, res) => {
  try {
    const { id } = req.params;
    const votacionEliminada = await Votacion.findByIdAndDelete(id);

    if (!votacionEliminada) {
      return res.status(404).json({ error: "Votación no encontrada" });
    }

    res.status(200).json({ mensaje: "Votación eliminada" });
  } catch (error) {
    console.error("Error al eliminar votación:", error);
    res.status(500).json({ error: "Error interno al eliminar la votación" });
  }
};

const { ethers } = require("ethers");

exports.obtenerVotacionPorId = async (req, res) => {
  try {
    console.log("ID recibido en req.params:", req.params);
    const { id } = req.params;

    const votacion = await Votacion.findById(id)
      .populate('idUsuarioCreador')   // ← para traer datos del usuario
      .populate('opciones');          // ← para traer opciones

    if (!votacion) {
      return res.status(404).json({ error: "Votación no encontrada" });
    }

    const respuesta = {
      id: votacion._id.toString(),
      titulo: votacion.titulo,
      descripcion: votacion.descripcion,
      usuarioCreador: votacion.idUsuarioCreador?.nombre || "Desconocido",  // ← usa el campo real de tu modelo Usuario
      imagen: votacion.imagen,
      fechaFin: votacion.fechaFin,
      opciones: votacion.opciones.map(opcion => ({
        id: opcion._id.toString(),   // puedes convertir a string simple, no a BigNumber
        descripcion: opcion.descripcion
      }))
    };

    res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al obtener votación por ID:", error);
    res.status(500).json({ error: "Error interno al obtener la votación" });
  }
};

exports.obtenerVotacionesPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;

    // Si la categoría es "Populares", devolver todas las votaciones
    if (categoria.toLowerCase() === "populares") {
      const votaciones = await Votacion.find();
      return res.status(200).json(votaciones);
    }

    // Convertimos siempre a array (aunque solo venga una)
    const categoriasArray = categoria.split(',').map(c => c.trim().toLowerCase());

    const votaciones = await Votacion.find({
      categorias: { $in: categoriasArray }
    });

    // Devolver array vacío en lugar de error
    res.status(200).json(votaciones);
  } catch (error) {
    console.error("Error al obtener votaciones por categoría:", error);
    res.status(500).json({ error: "Error interno al obtener las votaciones" });
  }
};

exports.obtenerVotacionesCreadasPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const votaciones = await Votacion.find({ idUsuarioCreador: id });

    if (votaciones.length === 0) {
      return res.status(404).json({ error: "No se encontraron votaciones" });
    }

    res.status(200).json(votaciones);
  } catch (error) {
    console.error("Error al obtener votaciones creadas por usuario:", error);
    res.status(500).json({ error: "Error interno al obtener las votaciones" });
  }
};

exports.obtenerVotacionesVotadasPorUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(id);

    const votaciones = await Voto.aggregate([
      {
        $match: { idUsuario: objectId },
      },
      {
        $lookup: {
          from: "votaciones",
          localField: "idVotacion",
          foreignField: "_id",
          as: "votacion",
        },
      },
      {
        $unwind: "$votacion",
      },
      {
        $project: {
          _id: "$votacion._id",
          titulo: "$votacion.titulo",
          descripcion: "$votacion.descripcion",
          tipo: "$votacion.tipo",
          fechaInicio: "$votacion.fechaInicio",
          fechaFin: "$votacion.fechaFin",
          estado: "$votacion.estado",
          imagen: "$votacion.imagen",
        },
      },
    ]);

    if (votaciones.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron votaciones para este usuario" });
    }

    res.status(200).json(votaciones);
  } catch (error) {
    console.error("Error al obtener votaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
