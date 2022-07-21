const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');

const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const router = Router();


router.post('/',[
    validarArchivo,
    validarCampos
], cargarArchivo);

router.put('/:coleccion/:id',[
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarArchivo,
    validarCampos
], actualizarImagen )

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;