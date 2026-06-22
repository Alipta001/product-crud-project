const express = require('express');
const HomeController = require('../controller/HomeController');
const AuthMiddileware = require('../middleware/auth');
const router = express.Router();


router.get('/', AuthMiddileware, HomeController.home);



module.exports = router