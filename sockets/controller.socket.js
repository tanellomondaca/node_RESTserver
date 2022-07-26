const { comprobarJWT } = require('../helpers/generar-jwt');

const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers['x-token'];
    
    const usuario = await comprobarJWT(token);
    
    if( !usuario ){
        return socket.disconnect();
    }
    console.log('cliente conectado', usuario.nombre )
    
};

module.exports = {
    socketController
}