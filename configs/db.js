const mongoose = require('mongoose');
require('dotenv').config();
const mongo = require('mongoose');

const connectDB = async () => {
    mongo.set('strictQuery', false)
    try {
        await mongoose.connect('mongodb+srv://mbajames122:9VYBgj2XoDKi8lIR@databasapi.qwmlx.mongodb.net/?retryWrites=true&w=majority&appName=databasAPI'
        //     ,
        //      {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
    );
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
