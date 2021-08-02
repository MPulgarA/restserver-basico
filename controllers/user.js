// Aca se crean las funciones de trabajo de las rutas, y luego se exportaran hacia el user mediante las routes
const {response, request} = require('express');

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

const postUsers = (req, res = response) =>{
    // Recibir la info del body
    const {nombre, edad} = req.body;
    res.json({
        "msg": "Post",
        "nombre": nombre,
        "edad": edad
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