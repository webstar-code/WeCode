const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../Schema/UserSchema');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleClientId,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    function (accessToken, refreshToken, profile, done) {

        User.findOne({ providerid: profile.id }, (err, user) => {
            if (!user) {
                const user = new User({
                    providerid: profile.id,
                    name: profile.name.givenName,
                    email: profile.emails[0].value
                });
                user.save()
                    .then((user) => {
                        return done(null, user);

                    });
            } else {
                return done(null, user);
            }
        })
    }
))


passport.use(new FacebookStrategy({
    clientID: process.env.FacebookAPPID,
    clientSecret: process.env.FacebookAPPSECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ["id", "email", "name"],
    proxy: true
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ providerid: profile.id }, (err, user) => {
            if (!user) {
                const user = new User({
                    providerid: profile.id,
                    name: profile.name.givenName,
                    email: ''
                });
                user.save()
                    .then((user) => {
                        return done(null, user);
                    })
            }
            else {
                return done(null, user);
            }
        })
    }
))