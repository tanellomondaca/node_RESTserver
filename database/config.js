const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = 'mongodb+srv://user_tanello:LnrFNHZB8mp52V2m@miclustertm.swt6psq.mongodb.net/cafeDB';

const dbConnection = async() => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: true
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
        
    }
}


module.exports = {
    dbConnection
}