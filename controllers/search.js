const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {User, Category, Product} = require('./../models')

const permittedCollections = [
    'user',
    'category',
    'product',
    'rol'
];

const searchUsers = async (term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    // const users = await User.count({ -> Da el conteo de todos los resultados
    const users = await User.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: users
    });

}

const searchCategories = async (term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');

    // const users = await User.count({ -> Da el conteo de todos los resultados
    const categories = await Category.find({nombre: regex, estado: true});

    res.json({
        results: categories
    });
}


const searchProducts = async (term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);

    if(isMongoId) {
        const product = await Product.findById(term).populate('categoria', 'nombre');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({nombre: regex, estado: true}).populate('categoria', 'nombre');

    res.json({
        results: products
    });
}



const search = async (req, res = response) => {

    const { collection, term } = req.params;

    if (!permittedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las coleciones permitidas son: ${permittedCollections}`
        });
    }

    switch (collection) {
        case 'user':
            searchUsers(term, res);
            break;
        case 'category':
            searchCategories(term, res);
            break;
        case 'product':
            searchProducts(term, res);
            break;
        default: 
            res.status(500).json({
                msg: 'La búsqueda no esta habilitada'
            });

    }
}


module.exports = {
    search,
};