const http = require('http');
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;


//custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.google.com.tr','http://127.0.0.1:5500','http:localhost:3500'];

const corsOptions = {
    origin:(origin,callback) => {
        if(whitelist.indexOf(origin)!=-1 || !origin){
            callback(null,true);
        }else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
//

//for url-encoded
app.use(express.urlencoded({extended:false}));

//for Json
app.use(express.json());

//for static files

app.use("/", express.static(__dirname));

app.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})

 
app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

app.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,'/new-page.html')
});

//Route handlers
app.get('/hello(.html)?', (req,res,next) => {
    console.log('attempted to load hello.html');
    next()
},(req,res) => 
{
    res.send('Hello world!');
}
)


const one = (req,res,next) => {
    console.log('one');
    next();
}

const two = (req,res,next) => {
    console.log('two');
    next();
}
const three = (req,res,next) => {
    console.log('three');
    res.send('Finished !!')
}

app.get('/chain(.html)?',[one,two,three]);


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

 
 