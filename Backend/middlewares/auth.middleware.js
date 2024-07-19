const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    try {
        const payload = jwt.verify(token, 'secretKey');
        req.userId = payload._id;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized request');
    }
}

module.exports = { verifyToken };
