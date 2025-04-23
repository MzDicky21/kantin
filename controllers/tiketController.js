const { Tiket } = require('../models')
const { where } = require('sequelize')

class TiketController {
    static async getAll(req, res, next) {
        try {
            const tikets = await Tiket.findAll({
                attributes: { exclude: ["password"] }
            })

            return res.json(tikets)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params
            const tiket = await Tiket.findByPk(id, {
                attributes: { exclude: ["password"] }
            })

            if (!tiket) {
                throw ({ name: "NOT_FOUND", message: "tiket not found" })
            }
            return res.json(tiket)
        } catch (error) {
            next(error)
        }
    }

    static async createTiket(req, res, next) {
        try {
            const data = req.body
            const newTiket = await Tiket.create(data)
            return res.status(200).json({ message: `new tiket with email: ${newTiket.email} has been created` })
        } catch (error) {
            next(next)
        }
    }

    static async updateTiket(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const find = await Tiket.findByPk(id)

            if (!find) {
                throw ({ name: "NOT FOUND", message: "tiket not found" })
            }

            find.name = data.name
            find.email = data.email

            await find.save()

            return res.json({ message: "tiket has been updated" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTiket(req, res, next) {
        try {
            const { id } = req.params
            const find = await Tiket.findByPk(id)

            if (!find) {
                throw ({ name: "NOT_FOUND", message: "tiket not found" })
            }

            await Tiket.destroy({
                where: { id }
            })
            return res.json({ message: "deleted successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = TiketController