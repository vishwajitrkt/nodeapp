const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require('../controllers/user.controllers.js');

// Retrieve all users
router.get('/', userController.findAll);

// Create a new user
router.post('/', userController.create);

// Retrieve a single user with id
router.get('/:id', auth, userController.findOne);

// Update a user with id
router.put('/:id', userController.update);

// Delete a user with id
router.delete('/:id', userController.delete);

// Login user
router.post('/login', userController.login);

module.exports = router