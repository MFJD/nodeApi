const mongoose = require('mongoose');
require('dotenv').config();
const mongo = require('mongoose');

const connectDB = async () => {
    mongo.set('strictQuery', false)
    try {
        await mongoose.connect(process.env.mongoUrl
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
