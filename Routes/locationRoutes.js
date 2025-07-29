const express = require('express');
const router = express.Router();
const LocationController = require('../Controller/LocationController.js');
const { authMiddleware } = require('../middleware/middleware.js');

router.post('/ceklembab', authMiddleware, LocationController.CheckLocation);
router.get('/artikel', authMiddleware, LocationController.NewsApi);
module.exports = router;
