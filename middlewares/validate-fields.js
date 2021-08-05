const { validationResult } = require('express-validator');

// errores del middlewere
const validateFields = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    // Si todo sale bien, como es un middlewere tendra un next, mediante esto, si llega a este punto, se solicita que se siga con el siguiente middlewere, 
    // Y si no hay otro middlewere, entonces al controlador (para de checl en check realizando las comprobaciones)
    next();
}

module.exports = {
    validateFields,
}