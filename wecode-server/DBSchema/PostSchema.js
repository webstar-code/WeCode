const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const PostSchema = new mongoose.Schema({
    Userid: String,
    displayname: String,
    PostImgref: String,
    bgcolor: String,
    bgcaption: String,
    caption: String,
    likes: String,
    comments: Array,
    createdAt: String,
});

const Post = connection.model('Post', PostSchema);
module.exports = Post;