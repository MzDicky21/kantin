const express = require("express")
const router = express.Router()
const AuthController = require('../controllers/authController')


router.post('/login', AuthController.login)
      .post('/register', AuthController.registasi)
      .patch('/:name/password', AuthController.patchPasswordUser)

module.exports = router
