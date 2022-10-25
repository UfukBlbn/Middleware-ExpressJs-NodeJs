const http = require('http');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;


//custom middleware logger
app.use(logger);

//CORS Options
app.use(cors(corsOptions));

//for url-encoded
app.use(express.urlencoded({extended:false}));

//for Json
app.use(express.json());

//for static files
app.use("/", express.static(__dirname));

//All routes for server
app.use('/',require('./routes/route'))

//route for api
app.use('/employees',require('./routes/api/employees'));
app.use('/register',require('./routes/register'));

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

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

 
 