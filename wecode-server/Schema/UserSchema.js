const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = connection.model('GoogleUser', UserSchema);
module.exports = User;