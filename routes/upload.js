const { Router } = require('express');
const { check } = require('express-validator');
const { allowCollections } = require('./../helpers');
const { validateFields, validateUploadFile } = require('./../middlewares');

const { fileUpload, updateImg, showImg, updateImgCloudinary} = require('./../controllers/upload');

const router = Router();


router.post('/', validateUploadFile, fileUpload);

router.put('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['users', 'products'])),
    validateUploadFile,
    validateFields
], updateImgCloudinary);

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['users', 'products'])),
    validateFields
], showImg);

module.exports = router;