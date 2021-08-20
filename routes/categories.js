const { Router } = require('express');
const {check} = require('express-validator');
const { validateJWT, validateFields } = require('../middlewares');
const {postCategory} = require('./../controllers/categories');


const router = Router();

// Todas las categorias public
router.get('/', (req, res)=>{
    res.json('Todo Bien get');
});

// Una categoria por id public
router.get('/:id', (req, res) =>{
    res.json('Todo Bien get id');
});

// Crear categoria - privado
router.post('/',[
    validateJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], postCategory);

// Actualizar registro por id
router.put('/:id', (req, res) =>{
    res.json('Todo Bien put');
});

// Admin
router.delete('/:id', (req, res) =>{
    res.json('Todo Bien delete');
});



module.exports = router;