const { response } = require('express');
const { Usuario } = require('../models');
const { ObjectId } = require('mongoose').Types;

// Colecciones validas que yo he creado
const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async(termino = '', res = response) => {
    // Validar si el termino es un mongo id
    const esMongoId = ObjectId.isValid( termino );

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }
};

const buscar = (req, res = response) => {
    const {coleccion, termino} = req.params;

    // Buscar si la coleccion enviada está entre las permitidas
    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: 'No se encuentra dentro de las colecciones permitidas'
        })
    }

    //
    switch (coleccion) {
        case 'categorias':
            break;
        case 'productos':
            break;
        case 'roles':
            break;
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
            
        default:
            res.status(500).json({
                msg: 'Se te olvido hacer esta busqueda'
            });
            break;
    }



    res.json({
        coleccion,
        termino
    })
};

module.exports = {
    buscar
}