const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracionController');

router.get('/', configuracionController.getConfiguracion);
router.put('/', configuracionController.updateConfiguracion);

module.exports = router;
