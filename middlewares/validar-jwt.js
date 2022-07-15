const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: ' No hay token en la peticion'
        })
    }

    try {
        // verificar token
        const {uid} = jwt.verify(token, process.env.SECRETEKEY) //recupramos el uid


        // leer el usuario que corresponde al uid que esta aqui
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario; //

        //Validar existencia de usuario
        if ( !usuario ) {
            return res.status(401).json({
                msg: ' Token no valido - usuario no exsiste en db'
            })
        }

        // Verificar si el estado del usuario es true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: ' Token no valido - usuario false'
            })
        }

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