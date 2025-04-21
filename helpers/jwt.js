const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const createToken = (id) => {
    return jwt.sign({id}, secret)
}

const decodedToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    createToken,
    decodedToken
}