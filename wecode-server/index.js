const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const passportSetup = require('./Auth/passport-setup');
const authRoute = require('./Routes/authRoute');
const userprofileRoute = require('./Routes/userprofile');
const activityRoute = require('./Routes/activity');
const searchRoute = require('./Routes/search');

const User = require('./Schema/UserSchema');
const app = express();

app.use(express.json())
app.use(cors());
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'Wesessions' });

app.use(session({
    secret: 'scret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    })
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoute);
app.use('/', userprofileRoute);
app.use('/', activityRoute);
app.use('/search', searchRoute);

app.get('/user', (req, res) => {
    console.log(req.session);
    console.log(req.user);
    let logout = '<a href="/logout">LOGOUT</a>'
    res.send(`Welcome ${req.user.name} <br> ${logout}`);
})

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.listen(4000, () => {
    console.log("listening on 3000");
})