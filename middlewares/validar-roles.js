const { response, request } = require('express');

const esAdminRole = (req = request, res = response) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') { 
        return res.status(401).json({
            msg: `${nombre} no es administrador. Debe ser administrador para eliminar`
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return (req = request, res = response) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token primero'
            })
        }
        

        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}. Su rol es ${req.usuario.rol}`
            })
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}
