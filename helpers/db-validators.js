const Role = require('./../models/role');
const User = require('./../models/user');

const isValidRole = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const existEmail = async (correo = '' ) =>{
    const existEmail = await User.findOne({correo});

    if(existEmail){
        throw new Error(`El email ${correo} ya se encuentra en la base de datos`);
    }
}

const existUserById = async (id) =>{
    const existUser = await User.findById(id);

    if(!existUser){
        throw new Error(`El id ${id} ingresado no existe`);
    }
}



module.exports = {
    isValidRole, 
    existEmail,
    existUserById
}