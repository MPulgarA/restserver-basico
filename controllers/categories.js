const {request, response} = require('express');
const {Category} = require('./../models');


// NOTE Populate 
// Obtener categorias - paginado y opcional - cuantas categorias tiene - populateMongoose
// Mediante el populate, las relaciones de fk salen de manera más concisa y con más información
const getCategories = async (req, res = response) =>{
    const {limit = 5, from = 0} = req.query;
    const query = {estado : true};

    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate("usuario", "nombre"),
    ]);

    res.json({
        total,
        category,
    });
}


// Obtener categoria - populate {objetoCategoria}
const getCategory = async (req, res= response) =>{
    const { id } = req.params; 
    const category = await Category.findById(id).populate('usuario', "nombre");

    res.json(category);
    
}

// Actualizar categoria (nombre)
const putCategory = async (req, res = response) => {
    const {id} = req.params;

    // Extraer el estado y usuario en caso de que se quiera pasar tales parametros para la actualizacion
    const {estado, userAutenticate, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.userAutenticate = req.userAutenticate._id;
    // req.userAutenticate._id

    const category = await Category.findByIdAndUpdate(id, data, {new : true});

    res.json({
        category 
    });
}

// Borrar categoria Borrado logico
const deleteCategory = async (req, res = response) =>{
    // Obtener el id de la categoria
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {estado: false}, {new: true});

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
    getCategories,
    getCategory,
    putCategory,
    postCategory,
    deleteCategory,
}