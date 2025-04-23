function errorHandler(err, req, res, next) {
    const errorResponse = {
        SequelizeUniqueConstraintError: { status: 400, message: err.errors ? err.errors.map(e => e.message) : err.message },
        SequelizeValidationError: { status: 400, message: err.errors ? err.errors.map(e => e.message) : err.message },
        VALIDATION: { status: 400, message: err.message },
        UNAUTHORIZED: { status: 401, message: err.message },
        FORBIDDEN: { status: 403, message: err.message },
        NOT_FOUND: { status: 404, message: err.message }
    }

    const respons = errorResponse[err.name] || { status: 500, message: "Internal server error" }

    return res.status(respons.status).json({ message: respons.message })
}

module.exports = errorHandler