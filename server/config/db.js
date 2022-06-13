const mongoose = require('mongoose');

const connectDB = async () => {
    const conDB = await mongoose.connect(process.env.MONGO_DB)

    console.log(`MongoDB Connected: ${conDB.connection.host}`.yellow.underline.bold)
};

module.exports = connectDB;