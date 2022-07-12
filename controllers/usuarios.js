const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: "Get desde controllers API",
        query,
    });
};

const usuariosPost = async (req, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body); //nueva instancia de usuario que recibe y asigna los datos al modelo

    await usuario
        .save()
        .then( () => console.log("Usuario grabado exitosamente."))
        .catch((error) => {
            console.log("Algo no salió bien");
            console.log(error);
        });

    res.json({
        msg: "POST desde controllers API",
        usuario,
    });
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "PUT  desde controllers API",
        id,
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "DELETE desde controllers API",
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "PATCH desde controllers API",
    });
};

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
};
