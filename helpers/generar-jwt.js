const jwt = require('jsonwebtoken');


//Recibimos el user Id del cliente
const generarJWT = ( uid = '' ) => {
    return new Promise ( (resolve, rejecet) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETEKEY, {
            expiresIn: '4h'
        }, (err, token) =>  {
            if(err){
                rejecet( 'No se pudo generar el token')
            }else{
                resolve( token );
            }
        })
    })
}

module.exports = {
    generarJWT
}