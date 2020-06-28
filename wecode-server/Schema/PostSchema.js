const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const PostSchema = new mongoose.Schema({
    Userid: String,
    displayname: String,
    PostImageRef: String,
    caption: String,
    createdAt: String,
});

const Post = connection.model('Post', PostSchema);
module.exports = Post;