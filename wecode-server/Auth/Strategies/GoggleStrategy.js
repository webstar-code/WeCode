const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = require('express')();

const googlestrategy = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GoogleClientId,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
    
            User.findOne({ name: profile.name }, (err, user) => {
                if (!user) {
                    const user = new User({
                        name: profile.name.givenName,
                        email: profile.emails[0].value
                    });
                    user.save()
                        .then((user) => {
                            console.log(user);
                            return done(null, user);
    
                        });
                } else {
                    return done(null, user);
                }
            })
        }
    ));
    
}



// app.get('/auth/google', 
// passport.authenticate('google', { scope: 'openid email profile' }));

// app.get('auth/google/callback',
// passport.authenticate('google', {successRedirect: '/user', failureRedirect: '/login'}));





// const googlestrategy = 

module.exports = googlestrategy;