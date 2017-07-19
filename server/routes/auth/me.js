const router = require('express').Router();
const User = require('../../../db/models/user');

//check the currently authenticated user
router.get('/', (req, res, next) => {
    console.log("req user all time", req.user);
    res.send(req.user);
});

// signup
router.post('/', (req, res, next) => {
    console.log(req.body);
   User.findOrCreate({
    where: {
        email: req.body.email
    },
    defaults: { //if we are creating the user include the
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
   })
   .spread((user, created) => {
    console.log(created);
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
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user) res.sendStatus(401);
        if(user.validPassword(req.body.password)){
            req.logIn(user, err =>{
                if(err) return next(err);
                console.log("req user in login", req.user)
                res.json(user);
            })
        }
    })
    .catch(next);
});

//logout
router.delete('/', (req, res, next) =>{
    req.logOut();
    res.sendStatus(204);
});

module.exports = router;
