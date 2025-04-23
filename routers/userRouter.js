const express = require("express")
const UserController = require('../controllers/userController')
const router = express.Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.patch('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router