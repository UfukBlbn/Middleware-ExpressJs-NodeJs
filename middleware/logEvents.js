console.log("test!");

//**npm i nodemon -g** => it monitors your files and when you save it automatically restarts the server so we're not always have to restart
//**npm init **/
//*npm i uuid */ =>  it allow us to generate ids different for each enttry
 

const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message,logName) => {
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem =  `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
        {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }

        fsPromises.appendFile(path.join(__dirname,'..','logs',logName), logItem);
    
    } catch (err) {
        
        console.log(error);
    }
}

const logger = (req,res,next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
}


module.exports = {logger,logEvents};

// console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))

// console.log(uuid())