let usuario = null;
let socket = null;
const url = ( window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            // Cambiar en produccion
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

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
}

const main = async () => {
    // Validar JWT
    await validarJWT();
}

main();

// Disparar conexion
// const socket = io();

