const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../../../db/models/user');

passport.use(
    new GoogleStrategy({
        clientID: '31462730452-dccu3tuh5t93ccatrc47hg3c5fibbmuj.apps.googleusercontent.com',
        clientSecret: 'LIlulLmwCU77RhaOOlbC4RsC',
        callbackURL: '/api/auth/google/verify'
    },
    (token, refreshToken, profile, done) =>{
        console.log("google profile", profile);
        const info = {
            email: profile.emails[0].value
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
router.get('verify', passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {cres.redirect('/campuses');}
);


module.exports = router;
