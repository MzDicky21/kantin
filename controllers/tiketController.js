const { Tiket } = require('../models')
const { where } = require('sequelize')

class TiketController {
    static async getAll(req, res, next) {
        try {
            const { page: pageQuery, size: sizeQuery, search, field } = req.query
            const page = pageQuery ? +pageQuery : 1
            const limit = sizeQuery ? +sizeQuery : 10

            const offset = (page - 1) * limit

            let query = {}
            if (search && field) {
                query[field] = { [Op.iLike]: `${search}` }
            }
            // console.log(query, "<-- query")
            const { count, rows } = await Tiket.findAndCountAll({
                where: query,
                offset,
                limit
            })

            res.json({
                data: rows,
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params
            const tiket = await Tiket.findByPk(id)

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
            return res.status(200).json({ message: `new tiket with has been created` })
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
