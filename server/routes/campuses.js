'use strict'
const api = require('express').Router()
const db = require('../../db')
var Promise = require('bluebird');
const  { Campus } = require('../../db/models');
const {resolve} = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: resolve(__dirname, '../../public', 'images'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage })


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
api.post('/', upload.single('image'), (req, res, next) => {
    console.log("body", req.body);
    console.log("file", req.file);
    Campus.create({name: req.body.campusName, image: req.file.filename})
    .then(campus => {
        res.json(campus);
    })
    .catch(err => {
        res.send(err.message);
    });
});


// update a campus
api.put('/:id', upload.single('image'), (req, res) => {
    Campus.findById(req.params.id)
    .then( campus => {
        if(!campus) res.sendStatus(404);
        else if(req.file) return campus.update({ name: req.body.campusName, image: req.file.filename });
        else return campus.update({ name: req.body.campusName });
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
