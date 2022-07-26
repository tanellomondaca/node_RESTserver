let usuario = null;
let socket = null;
const url = ( window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            // Cambiar en produccion
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

//Referencias HTML
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');

// Validar el tyoken del local storage
const validarJWT = async() => {
    const token = localStorage.getItem('token');
    if(token.length <= 10){
        window.localStorage = 'index.html';
        throw new Error('No hay topken en el servidor');
    }

    const resp = await fetch(url,{
        headers: {'x-token':token}
    });

    const {usuario: userDB,token: tokenDB} = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();

}

const conectarSocket = async() => {
    
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online')
    });
    socket.on('disconnect', () => {
        console.log('Sockets offline')
    });

    // Escuchas
    socket.on('recibir-mensajes', () => {
        // TODO:
    });

    socket.on('usuarios-activos', () => {
        // TODO:
    });

    socket.on('mensaje-privado', () => {
        // TODO:
    });

}

const main = async () => {
    // Validar JWT
    await validarJWT();
}

main();

// Disparar conexion
// const socket = io();

