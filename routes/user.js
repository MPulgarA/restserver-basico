const { Router } = require('express');
const {check} = require('express-validator');
const {isValidRole, existEmail, existUserById} = require('./../helpers/db-validators');

const { getUsers,
        putUsers,
        postUsers,
        deleteUsers } = require('./../controllers/user');

        
// Middleweres
const {validateJWT, validateFields, isAdminRol, hasRole} = require('./../middlewares');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const {validateFields} = require('./../middlewares/validate-fields');
// const { isAdminRol, hasRole } = require('../middlewares/validate-rol');

const router = Router();

router.get('/', getUsers);

// párametro de segmento
router.put('/:id',[
    // El check puede leer los parametros o los segmentos de la ruta
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById), 
    check('rol').custom(isValidRole),
    validateFields
],putUsers);

router.post('/',[
    // Middlewere que se le puede especificar que campo del body necesito revisar, luego, se le tiene que "explicar que es un correo"
    // El check no dispara el error enseguido, si no más bien, esta creando en la request todos los errores de los middleweres utilizados, almacenandolos
    // de tal manera de que cuando se llegue a la función, pueda confirmar si hay errores o no
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //El punto not demuestra contrariedad
    // valido si el formato del correo es correcto
    check('correo', 'El correo no es válido').isEmail(),
    // Valido si existe el correo
    check('correo').custom(existEmail),
    check('password', 'El password es obligatorio y debe ser mayor a 6 caracteres').isLength({min: 6}),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL','USER_ROLE']),
    // check('rol').custom((rol) =>isValidRole(rol)) -> esto es lo mismo que abajo, solo que cuando se tiene 
    // una funcion o callback cuyo argumento es el mismo argumento que esta recibiendo, entonces se puede obviar la 
    // parte y mandar solo la referencia a la funcion, y el primer argumento que este emitiendo el custom sera el primer argumento que se le enviara al rol
    check('rol').custom(isValidRole),
    // Una vez realizadas las validaciones del check, se generara la validación de los campos
    validateFields
], postUsers);

// Proteger la ruta si no se tiene un JWT validator
// Validaciones de manera secuencial con next
router.delete('/:id',[
    validateJWT,
    // isAdminRol,
    // Middlewere que acepte un usuario con varios roles, o cualquiera de los roles establecidos
    hasRole('ADMIN_ROL','VENTA_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById), 
    validateFields
], deleteUsers);

module.exports = router;