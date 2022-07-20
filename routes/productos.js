const { Router } = require("express");
const { check, body } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeProducto, existeCategoria } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// Crear producto - verificar token
router.post('/',[
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    body('categoria','La categoria es incorrecta: no es id Mongo').isMongoId(),
    body('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

// Obtener todos los productos
router.get('/', obtenerProductos);

// Obtener un producto, segun ID
router.get('/:id',[
    check('id','El id es incorrecto: no es id Mongo').isMongoId(),
    check("id").custom(existeProducto),
    validarCampos
], obtenerProducto);

// Actualizar producto - privado, con token
router.put('/:id',[
    validarJWT, 
    check("id", "Debe proporcionar ID para actualizar").not().isEmpty(),
    check("id", "No es un id de Mongo válido: id producto").isMongoId(), // Crear en db validators
    check("id").custom(existeProducto),
    validarCampos,
], actualizarProducto)

// Borrar producto
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido: id producto").isMongoId(), // Crear en db validators
    check("id").custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;