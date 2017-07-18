'use strict'
const api = require('express').Router()
const db = require('../../db')
var Promise = require('bluebird');
const {Student, Campus} = require('../../db/models');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
    // I know this because we automatically send index.html for all requests that don't make sense in our backend.
    // Ideally you would have something to handle this, so if you have time try that out!



//get all of the students
api.get('/', (req, res, next) => {
    Student.findAll()
    .then( students => {
        if(!students) res.sendStatus(404);
        else res.json(students);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});

//get a single student
api.get('/:id', (req, res, next) => {
    Student.findOne({where: { id: req.params.id},
        include: [{model: Campus, as: 'campus'
    }]})
    .then( student => {
        console.log(student);
        if(!student) res.sendStatus(404);
        else res.json(student);
    })
    .catch(err=> {
        res.sendStatus(err.status);
    });
});


//create a new student
api.post('/', (req, res, next) => {
    Promise.all([
        Campus.findById(req.body.campusId),
        Student.create({first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email})
    ])
    .spread((campus, student) => {
        student.setCampus(campus)
        res.json(student);
    })
    .catch(err => {
        res.send(err.message);
    });
});

//update a student
api.put('/:id', (req, res) => {
    Promise.all([
        Campus.findById(req.body.campusId),
        Student.findById(req.params.id)
    ])
    .spread((campus, student) => {
        student.update({first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email})
        .then( student =>{
            return student.setCampus(campus)
        })
        .then( student =>{
            res.json(student);
        })
        .catch( err =>{
           res.send(err.message);
        });
    })
    .catch(err => {
        res.send(err.message);
    });

});

//delete a student
api.delete('/:id', (req, res, next) =>{
    Student.findById(req.params.id)
    .then(student => {
        student.destroy()
        .then( () => {
            res.status(202).json(student);
        })
        .catch(err=>console.log(err));
    })
    .catch( err => {
        res.status(err.status).send(err.message);
    });
});



module.exports = api;
