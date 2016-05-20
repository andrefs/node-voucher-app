import express  from 'express';
import bodyParser from 'body-parser';
import db       from './db';
import async    from 'async';
import config   from '../config';
let debug = require('debug')('server');

let app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || (config && config.server && config.server.port) ? config.server.port : 9667;
const host = process.env.HOST || (config && config.server && config.server.host) ? config.server.host : 'localhost';

// Just to check if server is running ok
app.get('/status', (req, res) => {
    res.send('Server is running and accepting requests!');
});


// api routing
require('./routes/vouchers')(app);

async.series([
    function(next){ db.once('open', next); },
    function(next){
        debug(`Connected to MongoDB database!`);
        app.listen(port,host, next);
    }],
    function(err){
        if(err){
            console.error.bind(console, 'Error:');
            process.exit(1);
        }
        debug(`Server running on http://${host}:${port}`);
    }
);


module.exports = app;
