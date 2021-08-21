const { Router } = require('express');
const {check} = require('express-validator');
const { validateJWT, validateFields } = require('../middlewares');
const {postCategory, deleteCategory} = require('./../controllers/categories');


//Crear un middlewere personalizado para validar el id de la categoria 
// Para todas lasrutas que tiene el id, se les debe implementar el middlewere personaliz
// existeCategoria check('id').custom(existeCategoria) 

const router = Router();

// Todas las categorias public
router.get('/',[
    
],);

// Una categoria por id public
router.get('/:id',[

],);

// Crear categoria - privado
router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], postCategory);

// Actualizar registro por id
router.put('/:id',[

],);

// Eliminar categoria solo si eres admin
router.delete('/:id',[

],deleteCategory);



module.exports = router;