


const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }

    const pathCompleto = await subirArchivo(req.files,undefined /*Asi se usa el argumento por defecto */, 'img');

    res.json({
        path: pathCompleto
    })
    
};

module.exports = {
    cargarArchivo,
};

