'use strict'
const api = require('express').Router()
const db = require('../../db')
var Promise = require('bluebird');
const  { Campus } = require('../../db/models');


//get all of the campuses
api.get('/', (req, res, next) => {
    Campus.findAll()
    .then( campuses => {
        if(!campuses) res.sendStatus(400);
        else res.json(campuses);
    })
    .catch(err => {
        res.sendStatus(err.status);
    });
});

//get a single campus
api.get('/:id', (req, res, next) => {
    Campus.findById(req.params.id)
    .then( campus => {
        if(!campus) res.sendStatus(404);
        else res.json(campus);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});


//create a new campus
api.post('/', (req, res, next) => {
    Campus.create({name: req.body.name, image: req.body.image})
    .then(campus => {
        res.json(campus);
    })
    .catch(err => {
        res.send(err.message);
    });
});

//update a campus
api.put('/:id', (req, res) => {
    Campus.findById(req.params.id)
    .then( campus => {
        if(!campus) res.sendStatus(404);
        else return campus.update({ name: req.body.name, image: req.body.image });
    })
    .then((campus) =>{
        res.json(campus);
    })
    .catch( err => {
        res.status(err.status).send(err.message);
    })
});



//delete a campus
api.delete('/:id', (req, res, next) =>{
    Campus.destroy({where: {id: req.params.id}})
    .then( () => {
        res.sendStatus(202);
    })
    .catch( err => {
        res.status(err.status).send(err.message);
    });
});

// when adding a photo, beforeCreate a campus image add a path to public

module.exports = api;
