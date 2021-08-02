// Usualmente los paquetes o importaciones de terceros van arriba del todo, debido a que tiene mayor importancia que las importaciones de código realizado por uno
require('dotenv').config();
const Server = require('./models/server');
const server = new Server();

server.listen();
