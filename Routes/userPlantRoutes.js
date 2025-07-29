const express = require('express');
const router = express.Router();
const userPlantController = require('../Controller/userPlantController');
const { authMiddleware } = require('../middleware/middleware.js');

router.post('/', authMiddleware, userPlantController.plantNow);
router.get('/:user_id', authMiddleware, userPlantController.getUserPlants);
router.get('/', authMiddleware, userPlantController.getAlluserPlants);

module.exports = router;
