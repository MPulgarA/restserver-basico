const {request, response} = require('express');

const isAdminRol = (req = request, res = response, next) =>{
    if(!req.userAutenticate){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const {rol, nombre} = req.userAutenticate;

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede realizar tal acción`
        });
    }

    next();
}

// Se utilizara el operador rest para almacenar
const hasRole =  (...roles) =>{
    return (req = request, res = response, next) =>{
        if(!req.userAutenticate){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }
        
        if(roles.includes(req.userAutenticate.rol)){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRol,
    hasRole
}