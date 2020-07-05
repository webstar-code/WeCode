const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});

const TimelineSchema = new mongoose.Schema({},{strict: false});
const Timeline =  connection.model('Timeline', TimelineSchema);
module.exports = Timeline;