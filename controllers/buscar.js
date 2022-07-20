const { response } = require('express');
const { Usuario, Categoria, Producto } = require('../models');
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
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular para hacer la busqueda insensible a mayusculas
    console.log(regex);

    const usuarios = await Usuario.find({
        $or: [{nombre: regex }, {correo: regex}],  // Bandera del find, or es para hacer mas de una consulta, busca segun un criterio o el otro
        $and: [{estado: true}]
    });

    return res.json({
            results: usuarios
        })
};

const buscarCategorias = async(termino = '', res = response) => {
    // Validar si el termino es un mongo id
    const esMongoId = ObjectId.isValid( termino );

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular para hacer la busqueda insensible a mayusculas
    console.log(regex);

    const categoriasEncontradas = await Categoria.find({
        $and: [{estado: true}, {nombre: regex }]
    });

    return res.json({
            results: categoriasEncontradas
        })
};

const buscarProductos = async(termino = '', res = response) => {
    // Validar si el termino es un mongo id
    const esMongoId = ObjectId.isValid( termino );

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular para hacer la busqueda insensible a mayusculas
    console.log(regex);

    const productosEncontradas = await Producto.find({
        $and: [{estado: true}, {nombre: regex }]
    }).populate('categoria','nombre');

    return res.json({
            results: productosEncontradas
        })
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
            buscarCategorias(termino,res);
            break;

        case 'productos':
            buscarProductos(termino,res);
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

};

module.exports = {
    buscar
}