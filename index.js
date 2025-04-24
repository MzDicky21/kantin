const express = require('express')
const routers = require('./routers/indexRouter')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api', routers)

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})