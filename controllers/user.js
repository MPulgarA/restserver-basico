// Aca se crean las funciones de trabajo de las rutas, y luego se exportaran hacia el user mediante las routes
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');


const getUsers = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    // La respuesta es una coleccion de las dos promesas, ejecutara ambas promesas de manera simultanea, 
    // y el código no seguira a menos que las dos funcionen, y  si una da error, todas daran error
    // Destrucutración para asignar los valores de los resultados de las promesas
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const postUsers = async (req, res = response) => {
    // Recibir la info del body
    const { nombre, correo, password, rol } = req.body;

    // Esta es la creación de la instancia, para grabar el registro en mongo es
    const user = new User({ nombre, correo, password, rol });

    // Crear una validacion personalizada de express validator


    // Verificar si el correo existe
    const existEmail = await User.findOne({ correo });
    
    if (existEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado',
        })
    }

    // Encriptar la contraseña
    // el saltSync es para estabelcer el numero de vueltas que dara la encriptación (a mayor número, más complicado de desencriptar)
    // A mayor número, más seguro, pero tarda más en generarse
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB

    await user.save();

    // toJSON que envia los datos modificados en el models de user
    res.json({
        user
    });
}

const putUsers = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    // TODO Validar contra DB
    if (password) {
        // Desea actualizar su contraseña, se debe volver a realizar el hash
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // Actualizar el registro
    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    });
}

const deleteUsers = async (req, res = response) =>{
    const {id} = req.params;
    // const userAutenticate = req.userAutenticate;

    // Borrado fisico
    // const user = await User.findByIdAndDelete(id);

    // Borrado logico
    const user = await User.findByIdAndUpdate(id, {estado: false});

    
    res.json({
        user
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
}