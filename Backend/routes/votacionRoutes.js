const express = require('express');
const { crearVotacion, obtenerVotaciones, actualizarVotacion, eliminarVotacion } = require('../controllers/votacionController');

const router = express.Router();

// Middleware para validar ObjectId en MongoDB
const validarId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "❌ ID inválido" });
    }
    next();
};

// Definir rutas con validación de ID cuando sea necesario
router.post('/crear-votacion', crearVotacion);
router.get('/obtener-votaciones', obtenerVotaciones);
router.put('/actualizar-votacion/:id', validarId, actualizarVotacion);
router.delete('/eliminar-votacion/:id', validarId, eliminarVotacion);

module.exports = router;
