exports.success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || '';

    const response = {
        error: false,
        status: status,
        data: statusMessage
    }

    res.status(statusCode).json(response)
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';

    const response = {
        error: true,
        status: statusCode,
        message: statusMessage
    }

    res.status(statusCode).send(response)
}