const jwt = require('jsonwebtoken');
const config = require('../config');

function sign(data) {
    return jwt.sign(data, config.secretJwt)
}

function verifyJwt(token) {
    return jwt.verify(token, config.secretJwt)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req)
        console.log(decoded);

        // COMPROBAR TOKEN

        if(decoded.id !== owner){
            throw new Error('No tienes permisos');
        }
    }
}

function getToken(auth) {
    if(!auth) {
        throw new Error('Not token')
    }

    if(auth.indexOf('Bearer ') == -1){
        throw new Error('Formato invalido')
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verifyJwt(token);

    req.user = decoded

    return decoded;
}

module.exports = {
    sign,
    check
}