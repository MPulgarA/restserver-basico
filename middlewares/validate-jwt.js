const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const validateJWT = async(req = request, res = response, next) =>{
    // Obtener el JWT desde los headers
    // se debe pasar el nombr asignado al token en el header
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Validar jwt token
        // Esta funcion sirve para validar el jwt, si este no es vaido, gatillara un throw new error
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        
        // Leer el usuario que corresponde al uid
        const userAutenticate = await User.findById(uid); 
        if(!userAutenticate){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }
        
        // Verificar si el uid tiene estado en true
        if(!userAutenticate.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            });
        }


        req.userAutenticate = userAutenticate;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}


module.exports = {
    validateJWT
}