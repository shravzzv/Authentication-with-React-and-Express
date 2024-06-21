var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')
const protect = require('../middleware/protect.middleware')

router.get('/', protect, userController.getUsers)

module.exports = router
