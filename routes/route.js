var express = require('express');
var router = express();
const path = require('path');


router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})


module.exports= router;