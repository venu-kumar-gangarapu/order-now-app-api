const app = require('./app');
const connectDB = require('./config/db');
const PORT = require('./config/index');

app.listen(PORT.port,async ()=>{
    await connectDB();
    console.log("server runs on port 8080....");
});