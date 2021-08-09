const jwt = require('jsonwebtoken');

// uid => identificador unico del usuario, el uid es lo unico que se almacenara en el paylod del token
const generateJWT = (uid = '') =>{
    return new Promise((resolve, reject) =>{
        // Generar JWT
        const payload = {uid};
        // Firmar el token con el payload, el secret o private key (llave secreta, que permite firmar token si se llegase a conocer )
        // Si un token es firmado por una secretkey, y esta es cambiada, los token ya no serviran
        // Lo demas son las opciones, las cuales pueden ser el tiempo de expiracion, etc
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar ell token'); 
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}