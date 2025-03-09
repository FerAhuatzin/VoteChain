const express = require('express');
const { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarioController');
const router = express.Router();

router.post('/crear-usuario', crearUsuario);
router.get('/obtener-usuarios', obtenerUsuarios);
router.put('/actualizar-usuario/:id', actualizarUsuario);
router.delete('/eliminar-usuario/:id', eliminarUsuario);

module.exports = router;
