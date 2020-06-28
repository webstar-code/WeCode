const passport = require('passport');
const User = require('../../Schema/UserSchema');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = require('express')();

const googlestrategy = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GoogleClientId,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            

        }
    ));
    
}

module.exports = googlestrategy;