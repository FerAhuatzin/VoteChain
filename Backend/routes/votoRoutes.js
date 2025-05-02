const express = require('express');
const { crearVoto, obtenerVotosPorVotacion, obtenerVotoPorTxHash} = require('../controllers/votoController');
const validarId = require("../commonMiddlewares/idValidation")

const router = express.Router();

router.post('/registrar-voto', crearVoto);
router.get('/obtener-votos/:id',validarId, obtenerVotosPorVotacion);
router.get("/voto/tx/:txHash", obtenerVotoPorTxHash);

module.exports = router;
