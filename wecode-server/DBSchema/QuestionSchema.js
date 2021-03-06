const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const QuestionSchema = new mongoose.Schema({
    Userid: String,
    displayname: String,
    question: String,
    description: String,
    tags: Array,
    stars: Array,
    createdAt: String,
});

const Question = connection.model('Question', QuestionSchema);
module.exports = Question;