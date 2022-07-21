const { Usuario, Producto} = require('../models');


const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");



const cargarArchivo = async (req, res = response) => {

    const pathCompleto = await subirArchivo(req.files,undefined /*Asi se usa el argumento por defecto */, 'img');

    res.json({
        path: pathCompleto
    })
    
};

const actualizarImagen = async (req, res = response) => {


    const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({ msg: 'No existe usuario con ese did'});
            };

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({ msg: 'No existe producto con ese did'});
            };

            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    const nombre =  await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    
    res.json({modelo});
}

module.exports = {
    cargarArchivo,
    actualizarImagen
};

