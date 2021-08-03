const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Colocando la ruta de esta manera, es más ordenado y prolijo la detección de las rutas
        this.usersRoutePath = '/api/users';

        // Conectar a base de datos 
        this.connectDB();

        // Middlewere, funciones que añadira otras funcionalidades al webserver
        this.middlewares();
        
        // Rutas de app
        this.routes();

    }

    async connectDB(){
        await dbConnection();
    }
    
    // use es la  palabra clave para determinar que es un middleware
    middlewares(){

        this.app.use(cors());
        
        // Directorio publico
        this.app.use(express.static('public'));
        
        // Obtener la información que viene en el backend en formato JSON
        // Lectura y parseo de body
        // Con esto cualquier información de tipo JSON que venga en un post put y delete, la información la intentara serializar en un formato JSON
        this.app.use(express.json());
    }

    routes(){
        // En user no es necesario tener la ruta general, solo la ruta raiz, debido a que routes establece la ruta a utilizar
       this.app.use(this.usersRoutePath, require('../routes/user'));
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;