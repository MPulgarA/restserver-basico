const {response} = require('express');
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {

    const {id_token} = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        
        //Verificar si el correo existe en la base de datos 
        let user = await User.findOne({correo});
        
        if(!user){
            // Crear el Usuario
            const data = {
                nombre,
                correo, 
                password: ':P',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }
        
        // Si el usuario en DB esta bloqueado
        if(!user.estado){
            return res.status(401).json({
                msg: 'Cuenta bloqueada, hable con el administrador'
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'El token de Google no es valido'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}