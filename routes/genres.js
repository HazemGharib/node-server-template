/*jshint esversion: 6 */
// Express
const express = require('express');
const router = express.Router();

// Third party packages
const Joi = require('Joi');


// Loading Genres List
const genres = [
    {
        id: 1,
        name: "Action"
    },
    {
        id: 2,
        name: "Romance"
    },
    {
        id: 3,
        name: "Comedy"
    }
];


/* Validation Schemas */
const schema = {
    id: Joi.number().required(),
    name: Joi.string().min(3).required()
};
const payloadSchema = {
    name: Joi.string().min(3).required()
};
/* Schemas END */


/* Routes */

// get genres
router.get('/', (req, res, next) => {
    res.status(200).send(genres);
    next();
});

// get genre
router.get('/:id', (req, res, next) => {
    if(typeof(req.params.id) !== "string") {res.status(400).send(`Bad genre id`); next(); return;}

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {res.status(404).send(`Genre id ${req.params.id} is not found`); next(); return;}

    const {error} = Joi.validate(genre, schema);
    if(error) {res.status(500).send(`Error: ${error}`); next(); return;}

    res.status(200).send(genre);
    next();
});

// post genre
router.post('/', (req, res, next) => {

    let {payloadError} = Joi.validate(req.body, payloadSchema);
    if(payloadError) {res.status(500).send(`Error: ${payloadError}`); next(); return;}

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    let {error} = Joi.validate(genre, schema);
    if(error) {res.status(500).send(`Error: ${error}`); next(); return;}

    genres.push(genre);

    res.status(200).send(genre);
    next();
});

// put genre
router.put('/:id', (req, res, next) => {
    if(typeof(req.params.id) !== "string") {res.status(400).send(`Bad genre id`); next(); return;}

    const {payloadError} = Joi.validate(req.body, payloadSchema);
    if(payloadError) {res.status(500).send(`Error: ${payloadError}`); next(); return;}

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {res.status(404).send(`Genre id ${req.params.id} is not found`); next(); return;}

    genre.name = req.body.name;

    const {error} = Joi.validate(genre, schema);
    if(error) {res.status(500).send(`Error: ${error}`); next(); return;}

    res.status(200).send(genre);
    next();
});

// delete genre
router.delete('/:id', (req, res, next) => {
    if(typeof(req.params.id) !== "string") {res.status(400).send(`Bad genre id`); next(); return;}

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {res.status(404).send(`Genre id ${req.params.id} is not found`); next(); return;}

    const {error} = Joi.validate(genre, schema);
    if(error) {res.status(500).send(`Error: ${error}`); next(); return;}

    const genreIndex = genres.indexOf(genre);
    genres.splice(genreIndex,1);

    res.status(200).send(genre);
    next();
});

/* Routes END */

module.exports = router;