const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, edad, email, contraseña, fechaRegistro } = req.body;

        if (!nombre || !edad || !email || !contraseña) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const nuevoUsuario = new Usuario({
            nombre,
            edad,
            email,
            contraseña,
            fechaRegistro: fechaRegistro ? new Date(fechaRegistro) : new Date()
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });

    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario", detalle: error.message });
    }
};
