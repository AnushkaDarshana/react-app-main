const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const homepageController = require('../controllers/homepageController');


router.post('/register', UserController.register);
router.post('/login', AuthController.login);

// Get all homepage data
router.get('/get', homepageController.getAllHomepageData);

// Create a new homepage data entry
router.post('/create', homepageController.createHomepageData);

// Delete a homepage data entry
router.delete('/delete/:id', homepageController.deleteHomepageData);

// Update a homepage entry
router.put('/update/:id', homepageController.updateHomepageData);

module.exports = router;