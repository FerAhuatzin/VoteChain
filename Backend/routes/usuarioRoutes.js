const express = require('express');
const { crearUsuario } = require('../controllers/usuarioController');
const router = express.Router();

router.post('/crear-usuario', crearUsuario);

module.exports = router;
