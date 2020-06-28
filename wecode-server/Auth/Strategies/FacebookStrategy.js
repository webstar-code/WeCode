const passport = require('passport');
const User = require('../../Schema/UserSchema');
const FacebookStrategy = require('passport-facebook').Strategy;
const app = require('express')();

const facebookstrategy = () => {
  
passport.use(new FacebookStrategy({
    clientID: process.env.FacebookAPPID,
    clientSecret: process.env.FacebookAPPSECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ["id","email", "name"]
},
    function (accessToken, refreshToken, profile, done) {
       console.log(profile);
    
        User.findOne({providerid: profile.id }, (err, user) => {
            if (!user) {
                console.log("new User");
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
                console.log("already exists");

                return done(null, user);
            }
        })
    }))
    
}


module.exports = facebookstrategy;