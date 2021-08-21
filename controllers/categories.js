const {request, response} = require('express');
const {Category} = require('./../models');

const postCategory = async (req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const categoryDB = await Category.findOne({nombre});

    if(categoryDB){
        return res.status(400).json({
            msg: `La categoria ${categoryDB.nombre} ya existe`,
        });
    }

    console.log(req.userAutenticate);
    // Generar la data a guardar 
    const data = { 
        nombre,
        usuario: req.userAutenticate._id
    }

    const category = new Category(data);
    
    // Guardar db
    await category.save();

    res.status(201).json(category);

}

module.exports = {
    postCategory,
    
}