const adminOnly = async (req, res, next) => {
    try {
        const user = req.user

        if (user.role !== "admin") {
            throw ({name: "UNAUTHORIZED", message: "you don't have permossion"})
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = adminOnly