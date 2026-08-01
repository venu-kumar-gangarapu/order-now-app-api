const mongoose = require('mongoose');
const dns = require('node:dns');
const index = require('./index');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {        
        await mongoose.connect(index.db.uri)
        console.log("connected...");
    } catch (error) {
        console.error("Name:", error.name);
        console.error("Message:", error.message);
        console.error(error);
    }
}
module.exports = connectDB;
