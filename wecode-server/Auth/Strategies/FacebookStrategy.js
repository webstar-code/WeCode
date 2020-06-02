const passport = require('passport');
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
        User.find({ name: profile.name }, (err, user) => {
            if (!user) {
                const user = new User({
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
    }))
    
}



// app.get('/auth/facebook', 
// passport.authenticate('facebook'));
// app.get('auth/facebook/callback',
// passport.authenticate('facebook', {successRedirect: '/user', failureRedirect: '/login'}));



module.exports = facebookstrategy;