const passport = require('passport');
const Googlestrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user=>{
        done(null, user)
    })
});
passport.use(new Googlestrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/cb'
}, (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);
    // done('OK')

    // 2

    User.findOne({
            googleId: profile.id
        })
        .then((existsUser) => {
            if (existsUser) {
                done(null, existsUser)
            } else {
                new User({
                        googleId: profile.id
                    }).save()
                    .then(user => {
                        done(null, user)
                    })
            }
        }).catch((err) => {
            console.log(err)
        });
}));