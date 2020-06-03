const router = require('express').Router();
const UserProfile = require('../Schema/UserProfileSchema');

router.get('/', (req, res) => {
    UserProfile.find({}, (err, user) => {
        res.json(user);
    })
})

module.exports = router;