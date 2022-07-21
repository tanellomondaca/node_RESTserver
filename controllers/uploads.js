const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");

const cargarArchivo = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }

    const { archivo } = req.files;

    // Nombre del archivo - extensiones permitidas
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1]

    // Validar extension 
    const extensionesValidas = ['png','jpg','jpeg','gif','pdf'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg: `La extension ${extension} no es permitida`
        });
    }

    //Ubicar y nombrar
    const nombreTemp = uuidv4()+'.'+extension;
    const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);

    archivo.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({msg :"File uploaded to " + uploadPath});
    });

};

module.exports = {
    cargarArchivo,
};

