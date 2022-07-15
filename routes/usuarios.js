const { Router } = require("express");
const { check } = require("express-validator");

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require("../controllers/usuarios-controllers");

const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

//según cada petición que se haga el servidor devuelve una respuesta diferente

//GET
router.get("/", usuariosGet);
//PUT
router.put("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

//POST
router.post("/",[ // Middlewares
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras.').isLength({min: 6}),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
] , usuariosPost);

// DELETE
router.delete("/:id",[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos 
], usuariosDelete);

//Patch
router.patch("/", usuariosPatch);

module.exports = router;
