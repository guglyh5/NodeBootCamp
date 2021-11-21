const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, 
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindandModify: false
        });
        console.log(`MongoDb connected: ${conn.connection.host}`);
    };

module.exports = connectDB;