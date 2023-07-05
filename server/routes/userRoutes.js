const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

router.post('/register', UserController.register);
router.post('/login', AuthController.login);


module.exports = router;