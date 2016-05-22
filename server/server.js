import express  from 'express';
import bodyParser from 'body-parser';
import db       from './db';
import async    from 'async';
import config   from '../config';
import * as Router from 'react-router';
import configStore from '../shared/store/configStore';
import routes   from '../shared/routes';
import logger   from 'morgan';
import React    from 'react';
import ReactDOM from 'react-dom/server';
import {Provider} from 'react-redux';
import {syncHistoryWithStore}  from 'react-router-redux'
let debug = require('debug')('server');

let app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || (config && config.server && config.server.port) ? config.server.port : 9667;
const host = process.env.HOST || (config && config.server && config.server.host) ? config.server.host : 'localhost';


if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));                       // logger
}
app.set('views', './server/views');               // view engine setup
app.set('view engine', 'hbs');                    // views folder
//app.use(favicon(__dirname+'/../public/favicon.ico'));
app.use(express.static(__dirname+'/../public/')); // static files path

// api routing
require('./routes/vouchers')(app);
require('./routes/products')(app);

// Just to check if server is running ok
app.get('/status', (req, res) => {
    res.send('Server is running and accepting requests!');
});


app.use(function(req, res){
    // Store and history
    const memoryHistory = Router.createMemoryHistory(req.url)
    const store         = configStore(memoryHistory)
    const history       = syncHistoryWithStore( memoryHistory, store, {
        selectLocationState: state => state.get('routing').toJS()
    });

    Router.match({history, routes: routes(store), location: req.url}, (err, redirectLocation, renderProps) => {
        // Error
        if(err){
            console.error(err);
            res.status(500).send(err.message);
        }

        // Redirect
        else if (redirectLocation) {
            let redirectURL = redirectLocation.pathname + redirectLocation.search;
            debug('Redirecting to '+redirectURL);
            res.status(302).redirect(redirectURL);
        }

        // Ok
        else if (renderProps) {
            var html = ReactDOM.renderToString(
                <Provider className="root" store={store}>
                    <Router.RouterContext {...renderProps} />
                </Provider>
            );

            const initialState = store.getState();

            res.render('index.hbs',{
                layout       : false,
                html         : html,
                initialState : JSON.stringify(initialState)
            });
        }

        // Not found
        else {
            res.status(404).send('Page Not Found')
        }
    });
});


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
