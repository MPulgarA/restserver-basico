const dbValidators = require('./db-validators');
const categoryValidators = require('./category-validator');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const productValidators = require('./product-validator');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...categoryValidators,
    ...generateJWT,
    ...googleVerify,
    ...productValidators,
    ...uploadFile
}