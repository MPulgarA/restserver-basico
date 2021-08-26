
const { response } = require('express');
const { uploadFile } = require('./../helpers')

const fileUpload = async (req, res = response) => {

    // SI no vienen archivo ni ninguna propiedad
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: 'No hay arachivos que subir' });
        return;
    }

    // Imagenes, txt, markdown
    try {
        // const fileName = await uploadFile(req.files, ['txt', 'md'], 'texts');
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        res.json({ fileName });
    } catch (error) {
        res.status(400).send({error});
    }

}

module.exports = {
    fileUpload
}
