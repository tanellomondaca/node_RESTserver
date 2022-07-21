const path = require("path");
const fs = require("fs");

const { Usuario, Producto } = require("../models");

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req, res = response) => {
    const pathCompleto = await subirArchivo(
        req.files,
        undefined /*Asi se usa el argumento por defecto */,
        "img"
    );

    res.json({
        path: pathCompleto,
    });
};

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: "No existe usuario con ese id" });
            }

            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: "No existe producto con ese id" });
            }

            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(
            __dirname,
            "../uploads",
            coleccion,
            modelo.img
        );
        if (fs.existsSync(pathImagen)) {
            //Si la imagen existe en la coleccion debe ser borrada
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    res.json({ modelo });
};

const mostrarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: "No existe usuario con ese id" });
            }

            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res
                    .status(400)
                    .json({ msg: "No existe producto con ese id" });
            }

            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Buscar imagen del modelo
    if (modelo.img) {
        const pathImagen = path.join(
            __dirname,
            "../uploads",
            coleccion,
            modelo.img
        );
        if (fs.existsSync(pathImagen)) {
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(pathImagen);
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
};
