const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();

const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const passportSetup = require('./Auth/passport-setup');
const authRoute = require('./Routes/authRoute');


const User = require('./DBSchema/UserSchema');
const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'Wesessions' });

app.use(session({
    secret: 'scret',
    resave: false,
    store: sessionStore,
    cookie: {maxAge: 24 * 60 *60 * 1000}
    
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

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.use('/', authRoute);
// app.use('/api', userprofileRoute);

app.get('/api/user', (req, res) => {
    // console.log(req.session);
    // console.log(req.user);
    res.json(req.user);
})

app.get('/api', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.listen(4000, () => {
    console.log("listening on 4000");
})