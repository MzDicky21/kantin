const express = require("express")
const router = express.Router()
const TiketSantriController = require('../controllers/tiketSantriController')


router.get('/', TiketSantriController.getAll)
      .get('/:id', TiketSantriController.getById)
      .post('/',TiketSantriController.createTiketSantri)
      .patch('/:id', TiketSantriController.updateTiketSantriTiketId)
      .delete('/:id', TiketSantriController.deleteTiketSantri)