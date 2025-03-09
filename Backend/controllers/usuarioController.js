const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, edad, email, contraseña, fechaRegistro } = req.body;
        const nuevoUsuario = new Usuario({ nombre, edad, email, contraseña, fechaRegistro: fechaRegistro ? new Date(fechaRegistro) : new Date() });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: "Error al crear usuario" });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
};

exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(usuarioActualizado);
};

exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Usuario eliminado" });
};
