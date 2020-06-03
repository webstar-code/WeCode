const router = require('express').Router();
const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});
const activitySchema = new mongoose.Schema({
    feed: Array,
    createdAt: String
});

const activity = connection.model('activity', activitySchema);


router.post('/activity', (req, res) => {
   let x = new Date();
   x = x.toLocaleDateString();
   activity.findOne({createdAt: x}, (err, feed) => {
       if(feed) {
           activity.updateOne({$push: {feed: req.body}})
           .then(feed => {
               res.send(feed,"feed added");
           });
       }else{
           let feed = new activity({
               feed: req.body,
               createdAt: x
           })

           feed.save()
           .then(data => {
               res.json(data);
           })
       }
   })
//    .then(data => {
//        res.json(data);
//    })
})

router.get('/activity',  (req, res) => {
   activity.find()
   .then(data => {
       res.json(data);
   })
   .catch(err => {
       console.error(err);
    })
})

module.exports = router;