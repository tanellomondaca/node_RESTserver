const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');

const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const router = Router();


router.post('/', cargarArchivo);

router.put('/:coleccion/:id',[
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarArchivo,
    validarCampos
], actualizarImagen )


module.exports = router;