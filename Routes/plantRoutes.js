const express = require('express');
const router = express.Router();
const plantController = require('../Controller/plantController');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware.js');

router.get('/', authMiddleware, plantController.getAllPlants);
router.post('/', authMiddleware, adminMiddleware, plantController.createPlant);

module.exports = router;
