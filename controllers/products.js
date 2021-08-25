// 5 servicios rest para productos, paginado, con populate, etc

const { request, response} = require('express');
const { Product } = require('./../models');

const getProducts = async (req, res = response) =>{
    const { limit = 5, from = 0} = req.query;
    const query = {estado: true};

    const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        product
    });
}


const getProductById = async (req, res = response) =>{
    const { id } = req.params; 
    const product = await Product.findById(id)
                            .populate('usuario', "nombre")
                            .populate('categoria', "nombre");
    res.json(product);
}

const updateProduct = async (req, res = response) =>{
    const {id} = req.params;
    const {estado, userAutenticate, ...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.userAutenticate = req.userAutenticate._id;


    const product = await Product.findByIdAndUpdate(id, data, {new : true});

    res.json(product);
}

const deleteProduct = async (req, res = response) =>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(product);
}

const createProduct = async (req, res = response) =>{
    // const nombre = req.body.nombre.toUpperCase();
    const { estado, usuario, ...body} = req.body;


    const productDB = await Product.findOne({nombre: body.nombre});

    // TODO Llamar a middleware 
    if(productDB){
        return res.status(400).json({
            msg: `La categoria ${productDB.nombre} ya existe`,
        });
    }

    const data ={ 
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.userAutenticate._id,
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
}