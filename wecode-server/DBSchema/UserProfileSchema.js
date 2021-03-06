const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});
const UserProfileSchema = new mongoose.Schema({
    Userid: String,
    displayname: String,
    name: String,
    about: String,
    profession: String,
    education: String,
    ProfileImgref: String,
    post: Array,
    question: Array,
    followers: Array,
    following: Array,
    timeline: Array
})

const UserProfile = connection.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;