const express = require('express');
const { crearVotacion, obtenerVotaciones, actualizarVotacion, eliminarVotacion } = require('../controllers/votacionController');
const router = express.Router();

router.post('/crear-votacion', crearVotacion);
router.get('/obtener-votaciones', obtenerVotaciones);
router.put('/actualizar-votacion/:id', actualizarVotacion);
router.delete('/eliminar-votacion/:id', eliminarVotacion);

module.exports = router;
