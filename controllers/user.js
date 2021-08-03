// Aca se crean las funciones de trabajo de las rutas, y luego se exportaran hacia el user mediante las routes
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const getUsers = (req = request, res = response) =>{
    // Obtener queryParams
    const {q, nombre = "No Name", apiKey, page=1, limit=10} = req.query;
    res.json({
        "msg": "Get API Controller",
        q,
        nombre,
        apiKey,
        page, 
        limit
    });
}

const postUsers = async (req, res = response) =>{
    // Recibir la info del body
    const {nombre, correo, password, rol} = req.body;

    // Esta es la creación de la instancia, para grabar el registro en mongo es
    const user = new User({nombre, correo, password, rol});

    // Verificar si el correo existe


    // Encriptar la contraseña
    // el saltSync es para estabelcer el numero de vueltas que dara la encriptación (a mayor número, más complicado de desencriptar)
    // A mayor número, más seguro, pero tarda más en generarse
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB

    await user.save();

    res.json({
        "msg": "Post",
        user
    });
}

const putUsers = (req, res = response) =>{
    const {id}= req.params;
    res.json({
        "msg": "Put controller", 
        id
    });
}

const deleteUsers = (req, res = response) =>{
    res.json({
        "msg": "Delete controller"
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
}