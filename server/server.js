import express  from 'express';
import config   from '../config';
let debug = require('debug')('server');

let app = new express();
const port = process.env.PORT || (config && config.server && config.server.port) ? config.server.port : 9667;
const host = process.env.HOST || (config && config.server && config.server.host) ? config.server.host : 'localhost';

// Just to check if server is running ok
app.get('/status', (req, res) => {
    res.send('Server is running and accepting requests!');
});

app.listen(port, host, () => {
    debug(`Server running on http://${host}:${port}`);
});

module.exports = app;
