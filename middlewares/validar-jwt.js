const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: ' No hay token en la peticion'
        })
    }

    try {
        // verificar token
        const payload = jwt.verify(token, process.env.SECRETEKEY) //recupramos el uid
        
        req.uid = payload.uid ;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
        
    }
}

module.exports = {
    validarJWT
}