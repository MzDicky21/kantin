const { createToken } = require('../helper/jwt')
const { comparePassword, hashPassword } = require('../helper/bcrypt')
const { User } = require('../models')
const { where } = require('sequelize')

class AuthController {
    static async login(req, res, next) {
        try {
            const data = req.body

            if (!data.email) {
                throw ({ name: "UNAUTHORIZED", message: "email wajib diisi" })
            }

            if (!data.password) {
                throw ({ name: "UNAUTHORIZED", message: "password wajib diisi" })
            }

            const find = await User.findOne({
                where: { email: data.email }
            })

            if (!find) {
                throw ({ name: "UNAUTHORIZED", message: "Invalid creadential 2" })
            }

            const passwordAsli = comparePassword(data.password, find.password)

            if (!passwordAsli) {
                throw ({ name: "UNAUTHORIZED", message: "Invalid creadential 1" })
            }

            const token = createToken(find.id)

            return res.json({
                message: "login succes",
                token
            })
        } catch (error) {
            next(error)
        }
    }

    static async registasi(req, res, next) {
        try {
            const data = req.body
            const newUser = await User.create(data)

            return res.status(201).json({ message: `registasi user succes` })
        } catch (error) {
            next(error)
        }
    }

    static async patchPasswordUser(req, res, next) {
        try {
            const { username } = req.params
            const { newPassword, confirmsPassword } = req.body

            if (!username) {
                throw ({ name: "VALIDATION", message: "username wajib diisi!!" })
            }

            if (!newPassword) {
                throw ({ name: "VALIDATION", message: "newPassword wajib diisi!!" })
            }

            if (!confirmsPassword) {
                throw ({ name: "VALIDATION", message: "confirmsPassword wajib diisi!!" })
            }

            if (newPassword !== confirmsPassword) {
                throw ({ name: "VALIDATION", message: "mohon maaf sepertinya password anda tidak sinkron" })
            }

            const find = await User.findOne({ where: { username } })

            if (!find) {
                throw ({ name: "NOT_FOUND", message: "user not found" })
            }

            const hashedPassword = await hashPassword(newPassword)

            find.password = hashedPassword
            await find.save()
            return res.json(
                {
                    message: "password has band changed",
                    // data: data.password
                }
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController