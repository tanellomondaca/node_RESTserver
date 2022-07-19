const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria,
} = require("../controllers/categorias-controller");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

/* 
    {{url}}/api/categorías
*/

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoría por id - publico
// validacion personalizada de id por middleware
router.get(
    "/:id",
    [
        check("id", "No es un id de Mongo válido").isMongoId(), // Crear en db validators
        check("id").custom(existeCategoria), // Crear en db validators
        validarCampos,
    ],
    obtenerCategoria
);

// Crear categoria - privado - cualquier persona con un rol valido
router.post(
    "/",
    [
        validarJWT,
        check("nombre", "el nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);

// Actualizar id - privado - cualquiera con token válido
router.put(
    "/:id",
    [
        validarJWT,
        check("id", "Debe proporcionar ID para actualizar").not().isEmpty(),
        check("id", "No es un id de Mongo válido").isMongoId(), // Crear en db validators
        check("id").custom(existeCategoria),
        validarCampos,
    ],
    actualizarCategoria
);

// borrar una categoria - admin - estado: false
router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "Debe proporcionar ID para actualizar").not().isEmpty(),
        check("id").custom(existeCategoria),
        validarCampos,
    ],
    borrarCategoria
);

module.exports = router;
