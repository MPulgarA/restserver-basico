const path = require('path');
const { v4: uuidv4 } = require('uuid')

const uploadFile = ( files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        // Leer la extensión del archivo y restringir la subida de estos
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        if (!validExtension.includes(extension)) {
           return reject(`La extensión ${extension} no es permitida, permitidas: ${validExtension}`);
        }

        //Asignar nombre al archivo mediante el identificador unico uuid, con esto se elimina la problematica
        // de subir los mismos archivos
        const tempName = uuidv4() + '.' + extension;

        // Construcción del path donde se subira el archivo
        // Folder es la carpeta que se le puede pasar a la función, en donde se quiere guardar la imagen
        const uploadPath = path.join(__dirname, './../uploads/', folder, tempName);

        // Funcion mv de mover
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( tempName );

        });
    });
}

module.exports = {
    uploadFile
}