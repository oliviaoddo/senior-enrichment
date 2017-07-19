const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../../../db/models/user');

passport.use(
    new GoogleStrategy({
        clientID: '862473052004-p14m7om4804u69ge2e97iei9jnnk845h.apps.googleusercontent.com',
        clientSecret: 'i8TqeW7b5PQenV1PNrxAdX_0',
        callbackURL: '/api/auth/google/verify'
    },
    (token, refreshToken, profile, done) =>{
        console.log("google profile", profile);
        const info = {
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName
        };
        User.findOrCreate({
            where: {googleId: profile.id},
            defaults: info
        })
        .spread(user => {
            done(null, user);
        })
        .catch(done);
    })
);

router.get('/', passport.authenticate('google', {scope: 'email'}));

// the callback after the user has been authenticated
router.get('/verify', passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {res.redirect('/campuses');}
);


module.exports = router;
