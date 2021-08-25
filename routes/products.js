// Mismas rutas que categorias, validar jwt, campos, ids, token, actualizar 
// tiene que tener token, borrar tiene que ser administrador

const { Router } = require('express');
const { check } = require('express-validator');

const { getProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        createProduct } = require('./../controllers/products');

const { validateJWT, validateFields, isAdminRol} = require('./../middlewares');

const { existCategoryByID, existProductByID } = require('./../helpers/db-validators');

const router = Router();
// 
// Obtener todos los productos
router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existProductByID ),
    validateFields
], getProductById);

// Crear un nuevo producto
router.post('/', [
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existProductByID),
    validateFields
], createProduct);


// Actualizar un producto
router.put('/:id', [
    validateJWT,
    // check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
], updateProduct);

// Eliminar un producto
router.delete('/:id', [
    validateJWT,
    isAdminRol, 
    // check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
], deleteProduct);

module.exports = router;