const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    // Revisar si la verificacion en ruta tuvo errores o no+
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors);
    }
    
    next();    
}

module.exports = {
    validarCampos
}
