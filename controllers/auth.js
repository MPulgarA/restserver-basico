const {response} = require('express');
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) =>{
    
    const {correo, password} = req.body;

    try {
        // Verificar si el email existe el
        const user = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        // Si el usuario esta activo en la base de datos en el
        if(!user.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado false'
            });
        }

        // Verificar la contraseña
        // la funcion compareSync de bcrypt permite comparar si son iguales los datos (verificar la firma)
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if(!validatePassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            }); 
        }


        // Solo se puede enviar una sola respuesta
        // Generar JWT
        // Cada vez que un usuario se autentica, se genera una jwt diferente
        // Cuando se genere una peticion que requiera cierto tipo de autenticacion, vamos a pedir el token
        // y este token lo vamos a comprobar para ver si nosotros lo firmamos y si tiene la informacion esperada
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            msg: 'ALgo salio mal'
        });
    }
}

const googleSignIn = (req = request, res = response) => {

    const {id_token} = req.body;
    res.json({
        msg: 'Todo Ok Google',
        id_token
    });
}

module.exports = {
    login,
    googleSignIn
}