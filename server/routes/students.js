'use strict'
const api = require('express').Router()
const db = require('../../db')
var Promise = require('bluebird');
const {User, Campus} = require('../../db/models');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
    // I know this because we automatically send index.html for all requests that don't make sense in our backend.
    // Ideally you would have something to handle this, so if you have time try that out!



//get all of the students
api.get('/', (req, res, next) => {
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
api.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then( user => {
        if(!user) res.sendStatus(404);
        else res.json(user);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});


//create a new student
api.post('/', (req, res, next) => {
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
api.put('/:id', (req, res) => {

});

//delete a student
api.delete('/:id', (req, res, next) => {
    User.destroy({where: {id: req.params.id}})
    .then( () => {
        res.sendStatus(202)
    })
    .catch( err => {
        res.status(err.status).send(err.message);
    });
});



module.exports = api;
