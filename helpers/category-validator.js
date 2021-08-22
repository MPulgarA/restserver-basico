const Category = require('./../models/category');

const existCategory = async (category = '') =>{
    const existCategory = await Category.findOne({category});

    if(existCategory){
        throw new Error (`La categoria ${ category} ya se encuentra en la base de datos`);
    }
}

module.exports = {
    existCategory
}