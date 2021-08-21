const {request, response} = require('express');
const {Category} = require('./../models');



// Obtener categorias - paginado y opcional - cuantas categorias tiene - populateMongoose
// Mediante el populate, las relaciones de fk salen de manera más concisa y con más información
const getCategories = async (req, res = response) =>{
    const {} = req.query;
}

// Obtener categoria - populate {objetoCategoria}
const getCategory = async (req, res= response) =>{

}

// Actualizar categoria (nombre)


// Borrar categoria Borrado logico
const deleteCategory = async (req, res = response) =>{
    // Obtener el id de la categoria
    const {id}= req.params;
    const category = await Category.findByIdAndUpdate(id, {estado: false});

    res.json({
        category
    });
}


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

    // 201 estado de creación
    res.status(201).json(category);

}

module.exports = {
    postCategory,
    deleteCategory,
}