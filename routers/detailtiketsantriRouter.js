const express = require("express")
const router = express.Router()
const DetailTiketSantriController = require('../controllers/detailTiketSantriController')


router.get('/', DetailTiketSantriController.getAll)
      .get('/:id', DetailTiketSantriController.getById)
      .post('/', DetailTiketSantriController.create)
      .patch('/:id', DetailTiketSantriController.updateCount)
      .delete('/:id', DetailTiketSantriController.deleteDetailTiketSantri)



module.exports = router