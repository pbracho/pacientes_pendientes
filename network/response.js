const statusMessages = {
    '200': 'Ok',
    '201': 'Created',
    '400': 'Bad request',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Error'
}

exports.success = (req, res, message, status) => {
    let statusCode = !status ? 200 : status;
    let statusMessage = !message ? statusMessages[statusCode] : message;

    res.status(statusCode).send({
        error: '',
        body: statusMessage
    });
};

exports.error = (req, res, message, status, details) => {
    let statusCode = !status ? 500 : status;
    let statusMessage = !message ? statusMessages[statusCode] : message;

    console.log('[Response Error] ' + details);

    res.status(statusCode).send({
        error: statusMessage,
        body: ''
    });
};

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        throw new Error('Token is not defined');
    }
}

module.exports.verifyToken = verifyToken;