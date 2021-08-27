const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { uploadFile } = require('./../helpers');

// NOTE cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Product } = require('./../models');

const fileUpload = async (req, res = response) => {
    // Imagenes, txt, markdown
    try {
        // const fileName = await uploadFile(req.files, ['txt', 'md'], 'texts');
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.json({ fileName });
    } catch (error) {
        res.status(400).send({ error });
    }
}



const updateImg = async (req, res = response) => {
    const { id, collection } = req.params;

    // Variable para establecer el valor de modelo de manera condicional
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Esta parte no funciona jeje' });
    };


    // Limpieza imagenes previas
    if (model.img) {
        // Borrar la imagen del servidor
        const imgPath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imgPath)) {
            // Borrado de la imagen en base a todas las condiciones establecidas con anteriorirdad
            fs.unlinkSync(imgPath);
        }
    }

    try {
        const fileName = await uploadFile(req.files, undefined, collection);
        model.img = fileName;
        await model.save();
        res.json({
            model
        });
    } catch (error) {
        res.status(400).send({ error });
    }
}

const showImg = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                // retornar un placeholder
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                // retornar un placeholder
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Esta parte no funciona jeje' });
    };


    if (model.img) {
        const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
        if (fs.existsSync(imgPath)) {
            // Mostrar la imagen
            return res.sendFile(imgPath);
        }
    }


    // Construir el path de la imagen placeholder
    const imgPath = path.join(__dirname, './../assets/no-image.jpg');
    return res.sendFile(imgPath);
}


// update con Cloudinary
const updateImgCloudinary = async (req, res = response) => {
    const { id, collection } = req.params;

    // Variable para establecer el valor de modelo de manera condicional
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Esta parte no funciona jeje' });
    };


    // Limpieza imagenes previas
    if (model.img) {
        const nameSplit = model.img.split('/');
        const name = nameSplit[nameSplit.length - 1];
        const [ public_id ] = name.split('.');
        await cloudinary.uploader.destroy( public_id );
    }
    
    const { tempFilePath } = req.files.file; 
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    try {
        model.img = secure_url;
        await model.save();
        res.json(model);

    } catch (error) {
        res.status(400).send({ error });
    }
}

module.exports = {
    fileUpload,
    updateImg,
    showImg,
    updateImgCloudinary
}
