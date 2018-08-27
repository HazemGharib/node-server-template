/*jshint esversion: 6 */

// Express
const express = require('express');
const app = express();

// Third party packages
const config = require('config');
const helmet = require('helmet');
const cJson = require('circular-json');

// Custom middlewares
const notFoundHandler = require('./utils/404-handler');
const requestLogger = require('./utils/request-logger');

// Routers
const genres = require('./routes/genres');

// Setting view engine
app.set('view engine','pug');
app.set('views', './views');

/* Configuring Helmet and Request Body JSON */
if(process.env.NODE_ENV == 'production' && app.get('env') == 'production')
    app.use(helmet());

app.use(express.json());
/* Configuring End */


/* Application Routes */
app.get('/', (req, res, next) => {
    res.status(200).render(`index`,{
        title: "Genres API",
        message: "Hello World!!"
    });
    next();
});

app.get('/config', (req, res, next) => {
    let configString = `Application Name: ${config.get('name')}\r\n`;
    configString += (app.get('env') == 'production' || app.get('env') == 'development')? 
        `Mail:\r\n`+
            `\tHost: ${config.get('mail.host')}\r\n`+
            `\tHost: ${config.get('mail.password')}\r\n`
        :``;

    res.status(200).send(configString);
    next();
});

app.use('/api/genres',genres);
/* Routes End */

/* Application Handlers */
app.use(notFoundHandler);
app.use(requestLogger);
/* Handlers End */

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Genres API ${app.get('env')} instance is listening on http://localhost:${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.