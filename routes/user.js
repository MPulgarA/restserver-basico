const { Router } = require('express');
const {check} = require('express-validator');
const { getUsers,
        putUsers,
        postUsers,
        deleteUsers } = require('../controllers/user');


const router = Router();

router.get('/', getUsers);

// párametro de segmento
router.put('/:id', putUsers);

router.post('/',[
    // Middlewere que se le puede especificar que campo del body necesito revisar, luego, se le tiene que "explicar que es un correo"
    // El check no dispara el error enseguido, si no más bien, esta creando en la request todos los errores de los middleweres utilizados, almacenandolos
    // de tal manera de que cuando se llegue a la función, pueda confirmar si hay errores o no
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //El punto not demuestra contrariedad
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio y debe ser mayor a 6 caracteres').isLength({min: 6}),
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL','USER_ROLE']),
], postUsers);

router.delete('/', deleteUsers);

module.exports = router;