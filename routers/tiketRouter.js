const express = require("express")
const TiketController = require('../controllers/tiketController')
const router = express.Router()

router.get('/', TiketController.getAll)
router.get('/:id', TiketController.getById)
router.post('/:id', TiketController.createTiket)
router.patch('/:id', TiketController.updateTiket)
router.delete('/:id', TiketController.deleteTiket)

module.exports = router