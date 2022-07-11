require('dotenv').config();

//Importamos class de servidor para usarla aqui
const Server = require('./models/server');

//inicializamos el nuevo servidor
const server = new Server();

//Iniciamos el servidor con el metodo de escucha
server.listen();

