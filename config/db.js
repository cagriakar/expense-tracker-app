const mongoose = require('mongoose');

// create connection function for mongoDB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(
            `MongoDB Connected: ${connect.connection.host}`.cyan.underline.bold
        );
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
};

// export above function to use in server.js
module.exports = connectDB;
