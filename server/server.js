const express =  require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();


require('dotenv').config();
const port = process.env.port;
app.use(cookieParser(),express.json(),express.urlencoded({extended  : true}));
app.use(cors({credentials: true, origin:"http://localhost:3000"}))


require('./config/mongoose.config');
require('./routes/user.route')(app);
app.listen(port,()=>{
    console.log("Listening to port",port);
})
