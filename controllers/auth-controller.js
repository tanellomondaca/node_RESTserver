const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {
        // Pasos
        // 1. Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        console.log(usuario);
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario/correo - password no son correctos'
            })
        }
        
        // 2. Si el usario está activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario/correo - password no son correctos. Estado: false'
            })
            
        }
        // 3. Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario/correo - password no son correctos. password: incorrecto'
            })
        }

        // 4. Generar JWT
        const token = await generarJWT(usuario.id);
        

        res.json({
            msg: 'Login OK',
            token
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador.'
        })
    }
}

const googleSingIn = async (req, res = response) => {
    const {id_token}= req.body;

    res.json({
        msg: 'Todo bien',
        id_token
    })
}

module.exports = {
    login,
    googleSingIn
}

