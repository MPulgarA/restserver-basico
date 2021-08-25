const Product = require('./../models');

const existProduct =  async( product = '' ) =>{
    const existProduct = await Product.findOne({product});
    
    if(existProduct){
        throw new Error (`La el producto ${ product} ya se encuentra en la base de datos`);
    }
}

module.exports = {
    existProduct
}