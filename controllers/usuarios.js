const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: "Get desde controllers API",
    });
}
    
const usuariosPost = (req, res = response) => {
    res.json({
        msg: "POST desde controllers API",
    });
}
    
const usuariosPut = (req, res = response) => {
    res.json({
        msg: "PUT  desde controllers API",
    });
}
    
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "DELETE desde controllers API",
    });
}
    
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "PATCH desde controllers API",
    });
}
    

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}