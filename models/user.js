// Mongo a diferencia de otras bases de datos, guarda sus datos en objetos, o conocidos en documentos, grabadas en coleciones, que son como las tablas en las db sql
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    nombre:{
        type: String,
        // en required se le puede pasar un array, en cual el primer valor sera si es requerido o no, y el segundo es un mensaje de error en caso de que no sea enviado
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligator'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es obligator'],
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true,
        // Permite solamente estos roles
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    // Validar si el usario fue creado mediante Google
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Users', UserSchema);