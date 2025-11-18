const express = require('express');
const usuariosController = require('../controllers/usuariosController.js');
const { verificarToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', usuariosController.criar);

module.exports = router;
