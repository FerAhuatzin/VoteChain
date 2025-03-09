const express = require('express');
const { crearInvitacion, obtenerInvitaciones, actualizarInvitacion } = require('../controllers/invitacionController');

const router = express.Router();

router.post('/crear-invitacion', crearInvitacion);
router.get('/obtener-invitaciones', obtenerInvitaciones);
router.put('/actualizar-invitacion/:id', actualizarInvitacion);

module.exports = router;
