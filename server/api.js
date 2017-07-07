'use strict'
const api = require('express').Router()
const db = require('../db')
var Promise = require('bluebird');
const {User, Campus} = require('../db/models');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

//^ try handling errors in start.js
// try putting campuses and users in separate files

//get all of the campuses
api.get('/campuses', (req, res, next) => {
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
api.get('/campus/:id', (req, res, next) => {
    Campus.findById(req.params.id)
    .then( campus => {
        if(!campus) res.sendStatus(404);
        else res.json(campus);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});


//get all of the students
api.get('/students', (req, res, next) => {
    User.findAll()
    .then( users => {
        if(!users) res.sendStatus(404);
        else res.json(users);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});

//get a single student
api.get('/student/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then( user => {
        if(!user) res.sendStatus(404);
        else res.json(user);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});


//create a new campus
api.post('/campus', (req, res, next) => {
    Campus.create({name: req.body.name, image: req.body.image})
    .then(campus => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.send(err.message);
    });
});

//create a new student
api.post('/student', (req, res, next) => {
    Promise.all([
        Campus.findById(req.body.id),
        User.create({first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email})
    ])
    .spread((campus, user) => {
        user.setCampus(campus)
        res.sendStatus(200);
    })
    .catch(err => {
        res.send(err.message);
    });
});

//update a student
api.put('/student/:id', (req, res) => {

});

//update a campus
api.put('/campus/:id', (req, res) => {

});

//delete a student
api.delete('/student/:id', (req, res, next) => {
    User.destroy({where: {id: req.params.id}})
    .then( () => {
        res.sendStatus(202)
    })
    .catch( err => {
        res.status(err.status).send(err.message);
    });
});

//delete a campus
api.delete('/campus/:id', (req, res, next) =>{
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
