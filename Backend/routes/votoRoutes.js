const express = require('express');
const { crearVoto } = require('../controllers/votoController');

const router = express.Router();

router.post('/registrar-voto', crearVoto);

module.exports = router;
