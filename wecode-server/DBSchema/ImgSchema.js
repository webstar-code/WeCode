
const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});

const uploadSchema = new mongoose.Schema({
    Userid: String,
    ProfileImgref: String
});

const Img = connection.model('images', uploadSchema);

module.exports = Img;