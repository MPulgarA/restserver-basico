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


    // const users = await User.count({
    const users = await User.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: users
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
            break;
        case 'product':
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