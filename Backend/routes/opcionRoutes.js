const express = require('express');
const { crearOpcion, obtenerOpciones } = require('../controllers/opcionController');
const validarId = require("../commonMiddlewares/idValidation")

const router = express.Router();

router.post('/crear-opcion', crearOpcion);
router.get('/obtener-opciones/:id', validarId, obtenerOpciones);

module.exports = router;
