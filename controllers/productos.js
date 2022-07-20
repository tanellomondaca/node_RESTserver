const { request, response } = require("express");
const { restart } = require("nodemon");
const { Producto, Categoria } = require("../models");


// Crear producto
const crearProducto = async (req = request, res = response) => {
    /* Código del profe */
    const { estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `Ya existe un producto con el nombre ${productoDB.nombre}`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    } 

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);



    /* Código mío */

    // const { precio, categoria, descripcion } = req.body;
    // const nombre = req.body.nombre.toUpperCase();
    
    // // Verificar si existe ya existe un producto con ese nombre
    // const verificarNombre = await Producto.findOne({nombre});
    // if (verificarNombre) {
    //     return res.status(401).json({
    //         msg: `Ya existe un producto con el nombre ${nombre}`
    //     })
    // }
    // const usuario = req.usuario._id;

    // // Datos a guardar en producto
    // const data = {
    //     nombre,
    //     precio,
    //     categoria, 
    //     usuario,
    //     descripcion
    // }

    // // Crear y guardar
    // const producto = new Producto(data);
    // await producto.save();

    // res.status(201).json({ producto, msg: "Exito" });
};

// Obtener productoS
const obtenerProductos = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}; // Devolver solo los que estan con estado = true

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit( Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        desde,
        limite,
        total,
        productos
    })
};

// Obtener producto (singular)
const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if(!producto){
        return res.json({
            msg: "No existe producto con ese ID - ID: incorrecto"
        })
    }

    res.json({
        producto
    })

};

// Actualizar producto
const actualizarProducto = async (req = request, res = response) => {
    /* Codigo del profesor */
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findById(id, data, {new: true});

    res.json(producto);


    /* Codigo mío */
    // const {id} = req.params;
    // let { nombre, precio, categoria, descripcion, disponible } = req.body;
    // if(nombre){
    //     nombre = nombre.toUpperCase();
    // }

    // // Verificar que no exista otro producto con el mismo nombre
    // const verificarNombre = await Producto.findOne({nombre});
    // if (verificarNombre) {
    //     return res.status(400).json({
    //         msg: `Ya existe un producto con el nombre ${nombre}`
    //     })
    // }

    // // Si viene categoria, verificar que exista
    // if(categoria){
    //     const verificarCategoria = await Categoria.findById(categoria);
    //     if( !verificarCategoria ){
    //         return res.status(400).json({
    //             msg: 'Categoria no existe'
    //         });
    //     };
    // }

    // // Datos a actualizar
    // const nuevaData = {
    //     nombre,
    //     precio,
    //     categoria,
    //     descripcion,
    //     disponible
    // };

    // // Actualizar
    // const producto = await Producto.findByIdAndUpdate(id, nuevaData, {new: true})
    //                     .populate('categoria', 'nombre')
    //                     .populate('usuario', 'nombre');

    // // Respuesta
    // res.status(200).json({
    //     msg: 'Actualizado con éxito',
    //     producto
    // })


};

// Borrar producto - estado:false
const borrarProducto = async (req, res = response) => {
    const id = req.params.id;
    
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new : true});

    if( !productoBorrado){
        throw new Error('Algo salió mal');
    }

    res.status(201).json({
        msg: 'Producto eliminada con exito',
        productoBorrado
    })
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}