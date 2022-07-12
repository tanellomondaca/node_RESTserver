const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require("../controllers/usuarios");
const Role = require("../models/role");

const router = Router();

//según cada petición que se haga el servidor devuelve una respuesta diferente

//GET
router.get("/", usuariosGet);
//PUT
router.put("/:id", usuariosPut);

//POST
router.post("/",[ // Middlewares
    check('correo', 'El correo no es válido.').isEmail(),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras.').isLength({min: 6}),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( async (rol='') => {
        const existeRol = await Role.findOne({ rol });
        if (!existeRol){
            throw new Error(`El rol ${rol} no esta en la base de datos`)
        }
    }),
    validarCampos
] , usuariosPost);

// DELETE
router.delete("/", usuariosDelete);
//Patch
router.patch("/", usuariosPatch);

module.exports = router;
