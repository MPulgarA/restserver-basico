
const  validateJWT = require('../middlewares/validate-jwt');
const validateFields = require('./../middlewares/validate-fields');
const  validateRoles  = require('../middlewares/validate-rol');

// Con el operador spread se almacenara todo lo que se importa
module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRoles,
}
