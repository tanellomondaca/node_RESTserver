const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias-controller");
const { validarJWT } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

/* 
    {{url}}/api/categorías
*/
 
// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    // res.json('Todo ok');

})

// Obtener una categoría por id - publico
router.get('/:id', (req, res) => {
    // res.json('Todo ok');

})

// Crear categoria - privado - cualquier persona con un rol valido
router.post('/', [ 
    validarJWT ,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar id - privado - cualquiera con token válido
router.put('/:id', (req, res) => {
    // res.json('Todo ok');

})

// borrar una categoria - admin - estado: false
router.delete('/:id', (req, res) => {
    // res.json('Todo ok');

})

module.exports = router;