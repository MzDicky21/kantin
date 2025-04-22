const { DetailTiketSantri } = require('../models')


class DetailTiketSantriController {
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
            const { count, rows } = await DetailTiketSantri.findAndCountAll({
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
            const tiketSantri = await DetailTiketSantri.findByPk(id)

            if (!tiketSantri) {
                throw ({ name: "NOT_FOUND", message: "tiketSantri not found" })
            }
            return res.json(tiketSantri)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const data = req.body
            const newTiket = await DetailTiketSantri.create(data)
            return res.status(200).json({ message: `new tiket with has been created` })
        } catch (error) {
            next(error)
        }
    }

    static async updateCount(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const find = await DetailTiketSantri.findByPk(id)

            if (!find) {
                throw ({ name: "NOT FOUND", message: "tiket not found" })
            }

            find.count = data.count

            await find.save()

            return res.json({ message: "tiket has been updated" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteDetailTiketSantri(req, res, next) {
        try {
            const { id } = req.params
            const find = await DetailTiketSantri.findByPk(id)

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
