const express = require('express');
var router = express.Router();

const authController = require("../controllers/AuthController")

router.post('/', authController.index);

module.exports = router;