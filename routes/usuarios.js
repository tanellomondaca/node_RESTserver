const { Router } = require("express");
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
router.put("/", usuariosPut);
//POST
router.post("/", usuariosPost);
// DELETE
router.delete("/", usuariosDelete);
//Patch
router.patch("/", usuariosPatch);

module.exports = router;
