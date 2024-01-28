var express = require('express');
var router = express.Router();
const gettingStartedController = require("../controllers/GettingStartedController")

router.get('/hello-world', gettingStartedController.sayHelloWorld);
router.post('/greet', gettingStartedController.greet)

module.exports = router;
