const router = require('express').Router();
const UserProfile = require('../Schema/UserProfileSchema');

router.get('/search', (req, res) => {
    UserProfile.find({}, (err, user) => {
        res.json(user);
    })
})

module.exports = router;