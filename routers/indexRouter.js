const express = require("express")
const router = express()
const authMiddleware = require('../middlewares/authenthication')
const adminOnly = require('../middlewares/authorezation')
const errorHandler = require('../middlewares/errorhandler')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const tiketRouter = require('./tiketRouter')
const tiketSantriRouter = require('./tiketsantriRouter')
const detailTiketSantriRouter = require('./detailtiketsantriRouter')


router.use('/auth', authRouter)
    .use(authMiddleware)
    .use('/user', userRouter)
    .use('/tiket', tiketRouter)
    .use('/tiketSantri', tiketSantriRouter)
    .use('/detailTiketSantri', detailTiketSantriRouter)
    .use(errorHandler)

module.exports = router
