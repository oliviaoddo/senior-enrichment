'use strict'

const router = require('express').Router();
const User = require('../../db/models/user');


router.param('id', (req, res, next) => {
    User.findById(id)
    .then(user => {
        if (!user) res.sendStatus(404);
        req.requestedUser = user;
        next()
        return null;
    })
    .catch(next);
});

router.get('/:id', (req, res, next) =>{
    req.requestedUser.reload()
    .then(user => {
        res.json(user);
    })
    .catch(next);
})


router.post('/', (req, res, next) =>{
    User.create(req.body)
    .then(user => {
        re.status(201).json(user);
    })
    .catch(next);
})
