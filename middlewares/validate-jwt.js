const {response, request} = require('express');
const jwt = require('jsonwebtoken');

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
        
        req.uid = uid;

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