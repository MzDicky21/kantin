const { TiketSantri } = require('../models')
const { where } = require('sequelize')

class TiketSantriController {
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
            const { count, rows } = await TiketSantri.findAndCountAll({
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
            const tiketSantri = await TiketSantri.findByPk(id)

            if (!tiketSantri) {
                throw ({ name: "NOT_FOUND", message: "tiketSantri not found" })
            }
            return res.json(tiketSantri)
        } catch (error) {
            next(error)
        }
    }

    static async createTiketSantri(req, res, next) {
        try {
            const { TiketId } = req.params

            if (!TiketId) {
                throw ({ name: "NOT_FOUND", message: "TiketId not found" })
            } 
            const data = req.body
            await TiketSantri.create({
                TiketId
            })
            return res.status(200).json({ message: `new TiketSantri with has been created` })
        } catch (error) {
            next(next)
        }
    }

    // static async updateTiketSantriId(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const data = req.body

    //         const find = await TiketSantri.findByPk(id)

    //         if (!find) {
    //             throw ({ name: "NOT FOUND", message: "TiketSantri not found" })
    //         }

    //         find.SantriId = data.SantriId

    //         await find.save()

    //         return res.json({ message: "TiketSantri has been updated" })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async updateTiketSantriTiketId(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const find = await TiketSantri.findByPk(id)

            if (!find) {
                throw ({ name: "NOT FOUND", message: "TiketSantri not found" })
            }

            find.TiketId = data.TiketId

            await find.save()

            return res.json({ message: "TiketSantri has been updated" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTiketSantri(req, res, next) {
        try {
            const { id } = req.params
            const find = await TiketSantri.findByPk(id)

            if (!find) {
                throw ({ name: "NOT_FOUND", message: "TiketSantri not found" })
            }

            await TiketSantri.destroy({
                where: { id }
            })
            return res.json({ message: "deleted successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = TiketSantriController
