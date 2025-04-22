const { User } = require('../models')
const { where } = require('sequelize')

class UserController {
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
            const { count, rows } = await User.findAndCountAll({
                attributes: { exclude: ["password"] },
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
            const user = await User.findByPk(id, {
                attributes: { exclude: ["password"] }
            })

            if (!user) {
                throw ({ name: "NOT_FOUND", message: "user not found" })
            }
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    // static async create(req, res, next) {
    //     try {
    //         const data = req.body
    //         const newUser = await User.create(data)
    //         return res.status(200).json({message: `new user with email: ${newUser.email} has been created`})
    //     } catch (error) {
    //         next(next)
    //     }
    // }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params
            const data = req.body

            const find = await User.findByPk(id)

            if (!find) {
                throw ({ name: "NOT FOUND", message: "user not found" })
            }

            find.name = data.name
            find.email = data.email

            await find.save()

            return res.json({ message: "user has been updated" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const find = await User.findByPk(id)

            if (!find) {
                throw ({ name: "NOT_FOUND", message: "user not found" })
            }

            await User.destroy({
                where: { id }
            })
            return res.json({ message: "deleted successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController
