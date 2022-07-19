const { response, request } = require("express");
const { Categoria } = require("../models");
const categoria = require("../models/categoria");
const usuario = require("../models/usuario");

// obtenerCategorias - Paginado - ver total - populate?
const obtenerCategorias = async (req = request, res = response) => {
    // Paginacion
    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true};
 

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),     //Esta linea va a contar cuantas categorias hay
        Categoria.find(query)
            .skip( Number(desde) )      //desde que registro mostrará
            .limit( Number(limite) )    //Cuantos mostrara la paginacion
            .populate('usuario','nombre')
    ])

    res.json({
        limite,
        desde,
        total,
        categorias
    })
};

// obtenerCategoria - objeto de la categoria -  populate {}
 const obtenerCategoria = async (req,res) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria);
 };

// Crear Categoria en DB
const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    // Si existe categoria
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre}, ya existe`,
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
    };

    // Hacer creacion
    const categoria = new Categoria(data);

    // Guardar en DB
    await categoria.save();

    res.status(201).json({ categoria, msg: "Exito" });
};

// actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    //debo recibir ID en params y en el body el nuevo nombre
    const id = req.params.id; // ID de la categoria a actualizar
    const  nombre  = req.body.nombre.toUpperCase();

    //revisar que no haya otra categoria con ese nombre
    const mismoNombre = await Categoria.findOne({nombre});
    if (mismoNombre) {
        return res.status(400).json({
            msg: 'Ya existe categoria con ese nombre.'
        })
    }

    // Actualizar
    const categoria = await Categoria.findByIdAndUpdate(id, {nombre}, {new: true});
     


    res.json({
        msg: 'Categoria actualizada con exito',
        categoria
    })

};

// borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    const id = req.params.id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new : true});

    if( !categoria){
        throw new Error('Algo salió mal');
    }

    res.status(201).json({
        msg: 'Categoria eliminada con exito',
        categoria
    })
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria
};

