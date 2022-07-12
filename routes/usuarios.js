const { Router } = require("express");
const { check } = require("express-validator");
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

//según cada petición que se haga el servidor devuelve una respuesta diferente

//GET
router.get("/", usuariosGet);
//PUT
router.put("/:id", usuariosPut);
//POST
router.post("/",[
    check('correo', 'El correo no es válido.').isEmail(),
] , usuariosPost);
// DELETE
router.delete("/", usuariosDelete);
//Patch
router.patch("/", usuariosPatch);

module.exports = router;
