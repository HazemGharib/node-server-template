/*jshint esversion: 6 */

// Express
const express = require('express');
const path = require('path');
const app = express();

// Third party packages
const config = require('config');
const helmet = require('helmet');
const cJson = require('circular-json');
const favicon = require('serve-favicon');

// Custom middlewares
const notFoundHandler = require('./utils/404-handler');
const requestLogger = require('./utils/request-logger');

// Routers
const genres = require('./routes/genres');

// // Global variables
// let sideBarToggle = false;

// // Setting view engine
app.set('view engine','pug');
app.set('views', './views');

/* Configuring Helmet, Request Body JSON & Favicon */
if(process.env.NODE_ENV == 'production' && app.get('env') == 'production')
    app.use(helmet());

app.use(express.json());
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static(__dirname + '/public'));
/* Configuring End */


/* Application Routes */
app.get(['/','/profile'], (req, res, next) => {
    res.status(200).render(`profile`,{
        title: "Hazem Gharib [Full Stack Developer] - Profile",
        message: "Hello World!!"
    });
    next();
});

app.get('/contact', (req, res, next) => {
    res.status(200).render(`contact`,{
        title: "Hazem Gharib [Full Stack Developer] - Contact",
        message: "Hello World!!"
    });
    next();
});

app.get('/experience', (req, res, next) => {
    res.status(200).render(`experience`,{
        title: "Hazem Gharib [Full Stack Developer] - Previous Experience",
        message: "Hello World!!"
    });
    next();
});

app.get('/skills', (req, res, next) => {
    res.status(200).render(`skills`,{
        title: "Hazem Gharib [Full Stack Developer] - Skills",
        message: "Hello World!!"
    });
    next();
});

app.get('/config', (req, res, next) => {
    const configJSON = {
        "ApplicationName" : config.has('name') ? config.get('name') : undefined,
        "Mail" : {
            "Host" : config.has('mail.host') ? config.get('mail.host') : undefined,
            "Password" : config.has('mail.password') ? config.get('mail.password') : undefined
        },
    };

    console.log(configJSON);
    res.status(200).send(configJSON);
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