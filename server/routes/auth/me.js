const router = require('express').Router();
const User = require('../../../db/models/user');

//check the currently authenticated user
router.get('/', (req, res, next) => {
    res.send(req.user);
});

// signup
router.post('/', (req, res, next) => {
   User.findOrCreate({
    where: {
        email: req.body.email
    },
    defaults: { //if we are creating the user include the
        password: req.body.password
    }
   })
   .spread((user, created) => {
     if(created){
        req.logIn(user, err =>{
            if(err) return next(err);
            res.json(user);
        });
     } else {
        res.sendStatus(401); // a user with that email already exists, which means they cannot sign up
     }
   });
});

//login
router.put('/', (req, res, next) =>{
    User.findOne({
        where: {email: req.body.email, password}
    })
    .then(user => {
        if(!user) res.sendStatus(401);
        return user.validPassword(req.body.password)
    })
    .then(response => {
        console.log(response);
        if(response) req.logIn(user, err =>{
            if(err) return next(err);
            res.json(user);
        })
    })
    .catch(next);
});

//logout
router.delete('/', (req, res, next) =>{
    req.logOut();
    res.sendStatus(204);
});

module.exports = router;