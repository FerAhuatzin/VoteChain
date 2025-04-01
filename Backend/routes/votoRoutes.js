const express = require('express');
const { crearVoto, obtenerVotosPorVotacion} = require('../controllers/votoController');
const validarId = require("../commonMiddlewares/idValidation")

const router = express.Router();

router.post('/registrar-voto', crearVoto);
router.get('/obtener-votos/:id',validarId, obtenerVotosPorVotacion);

module.exports = router;
