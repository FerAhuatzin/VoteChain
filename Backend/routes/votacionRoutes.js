const express = require('express');
const { crearVotacion } = require('../controllers/votacionController');
const router = express.Router();

router.post('/crear-votacion', crearVotacion);

module.exports = router;
