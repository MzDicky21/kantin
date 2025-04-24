const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')
const { User } = require('../models')


class XlsxController {
   static async readXlsx(req, res, next) {
        try {
            const filePath = path.join(__dirname, '..', 'coba.xlsx')
            const workbook = xlsx.readFile(filePath)
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const data = xlsx.utils.sheet_to_json(worksheet)
            
            if (!data) {
                throw new Error({ name: "NOT_FOUND", message: "file not found" })
            }

            await User.create({
                username: data.nama,
                email: data.email,
                password: data.password,
                role: data.role
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = XlsxController