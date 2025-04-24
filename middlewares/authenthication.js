const { decodedToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authMiddleware(req, res, next) {
    try {
        const header = req.headers.authorization

        if (!header) {
            throw ({ name: "UNAUTHORIZED", message: "please login first"})
        }

        const token = header.split(" ")[1]

        const verify = decodedToken(token)

        const find = await User.findByPk(verify.id, {
            attributes: { exclude: ['password'] }
        })

        if (!find) {
            // throw({ name: "UNAUTHORIZED", message: "invalid creadential"})
            throw ({ name: "NOT_FOUND", message: "user not found "})
        }

        req.user = find

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authMiddleware