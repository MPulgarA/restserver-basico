const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        // Esto regresa una promesa de tipo mongoose
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectarse con la base de datos');
    }
}

module.exports = {
    dbConnection
};