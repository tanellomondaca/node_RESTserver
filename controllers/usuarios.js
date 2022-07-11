const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: "Get desde controllers API",
        query
    });
}
    
const usuariosPost = (req, res = response) => {
    const body = req.body;
    
    res.json({
        msg: "POST desde controllers API",
        body
    });
}
    
const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "PUT  desde controllers API",
        id
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