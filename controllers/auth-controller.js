const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google.verify');

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
    try {
        const {nombre, img, correo} = await googleVerify(id_token);
        // Buscamos si existe el usuario en la base de datos
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) { // Si el usuario no existe
            //Tengo que crearlo
            const data = { // Data que necesito grabar
                nombre,         // Las variables correo, nombre y
                correo,         // img son extraídas de usuario
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
                
            };
            usuario = new Usuario(data);
            await usuario.save();

        }
        // Si el usuario en DB está en false
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }
        // Generar JWT+}
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar.',
            msg2: error
        })
    }
}

module.exports = {
    login,
    googleSingIn
}

