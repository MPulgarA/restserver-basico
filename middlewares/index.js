
const validateJWT = require('./validate-jwt');
const validateFields = require('./validate-fields');
const validateRoles = require('./validate-rol');
const validateFile = require('./validate-file');

// Con el operador spread se almacenara todo lo que se importa
module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRoles,
    ...validateFile,
}
