const { comprobarJWT } = require('../helpers/generar-jwt');
const { ChatMensajes } = require('../models/chat-mensajes');

const chatMensajes = new ChatMensajes();


const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers['x-token'];
    
    const usuario = await comprobarJWT(token);
    
    if( !usuario ){
        return socket.disconnect();
    }
    console.log('cliente conectado', usuario.nombre )

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-activos', chatMensajes.usuarioArr)
    
    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuarioArr)
    })
    
};

module.exports = {
    socketController
}