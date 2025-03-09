const express = require('express');
const { crearOpcion } = require('../controllers/opcionController');

const router = express.Router();

router.post('/crear-opcion', crearOpcion);

module.exports = router;
