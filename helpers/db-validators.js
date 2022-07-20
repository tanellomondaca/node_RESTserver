const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require("../models/usuario");

const esRoleValido = async (rol='') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol){
        throw new Error(`El rol ${rol} no esta en la base de datos`)
    }
}

const emailExiste = async ( correo = '' ) => {
    //  Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error('Ese correo ya está registrado.');
    }
}

const existeUsuarioPorId = async ( id ) => {
    //  Verificar si el iD existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error('El id no existe');
    }
}

const existeCategoria = async ( id ) => {
    //  Verificar si el iD de categoriaexiste
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ) {
        throw new Error('El id no existe');
    }
}

const existeProducto = async ( id ) => {
    //  Verificar si el iD de categoriaexiste
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ) {
        throw new Error('El id no existe');
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}
 
