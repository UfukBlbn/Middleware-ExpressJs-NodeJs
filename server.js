require('dotenv').config();
const http = require('http');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const express = require('express');
const credentials = require('./middleware/credentials');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;

//Connect db
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check before CORS !!
//and fetch cookies credentials requirement.
app.use(credentials);

//CORS Options
app.use(cors(corsOptions));

//for url-encoded
app.use(express.urlencoded({extended:false}));

//for Json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//for static files
app.use("/", express.static(__dirname));

//All routes for server
app.use('/',require('./routes/route'))

//route for api
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));

//verify middleware
app.use(verifyJWT);
app.use('/blogs',require('./routes/api/blogs'));

//404
app.all('*', (req,res) => {
    res.status(404);
    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    }else if(res.accepts('json')){
        res.json({error:"404 Not Found"})
    }else{
        res.type('txt').send("404 Not Found");
    }
    
})


//custom error Handler
app.use(errorHandler);


mongoose.connection.once('open',()=>{
    console.log("Connected to db");
    app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
});

 
 