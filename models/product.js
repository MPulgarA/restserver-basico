const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,    
        default: true,
        required: true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Users', 
        required: true
    },
    precio: {
        type: Number, 
        default: 0,  
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    descripcion :{ type: String},
    disponible : { 
        type: Boolean, 
        default : true, 
    }, 
    img:{ type: String },
});

ProductSchema.methods.toJSON = function(){
    // Destructurar para sacar la versión y el estado de la producto
    const {__v, estado,...category} = this.toObject();
    return category;
}

module.exports = model('Product', ProductSchema);