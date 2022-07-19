const { response, request } = require("express");
const { Categoria } = require("../models");

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

module.exports = {
    crearCategoria,
};

