const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI'); // It gets the variable defined in default.json "mongoURI" variable

const connectDB = async() => {
    try{
        mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        //if connected print this
        console.log('mongoDB connected')
    }
    catch{
        // if not connected use this
        console.error(err.message);
        process.exit(1);
        
    }
}

module.exports = connectDB;