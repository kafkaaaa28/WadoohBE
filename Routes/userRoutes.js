// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController.js');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware.js');
router.post('/', authMiddleware, adminMiddleware, userController.createpetani);
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.put('/:id', authMiddleware, adminMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
