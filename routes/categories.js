const { Router } = require('express');
const { check } = require('express-validator');

const { existCategoryByID } = require('./../helpers/db-validators');

const { getCategories,
    getCategory,
    postCategory,
    deleteCategory } = require('./../controllers/categories');

const { validateJWT, validateFields, hasRole } = require('../middlewares');


//Crear un middlewere personalizado para validar el id de la categoria 
// Para todas lasrutas que tiene el id, se les debe implementar el middlewere personaliz
// existeCategoria check('id').custom(existeCategoria) 

const router = Router();

// Todas las categorias public
router.get('/', getCategories);

// Una categoria por id public
router.get('/:id', [
    check('id').custom(existCategoryByID),
    check('id', 'No es un ID valido').isMongoId(),
    validateFields
], getCategory);

// Crear categoria - privado
router.post('/', [
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], postCategory);

// Actualizar registro por id - privado
router.put('/:id', [
    validateJWT,
    check('id').custom(existCategoryByID),
    validateFields,
]);

// Eliminar categoria solo si eres admin
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROL'),
    check('id').custom(existCategoryByID),
    validateFields
], deleteCategory);



module.exports = router;