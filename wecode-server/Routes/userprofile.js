const router = require('express').Router();
const UserProfile = require('../Schema/UserProfileSchema');

router.post('/userprofile', (req, res) => {
    const newuser = {
        UserId: req.user.id,
        displayname: req.body.displayname,
        name: req.body.name,
        about: req.body.about,
        profession: req.body.profession,
        university: req.body.university,
    };

    UserProfile.findOne({displayname: req.body.displayname}, (err, user) => {
        if(user) {
            user.replaceOne(newuser)
            .then(() => {
                res.send("profile updated");
            })
            .catch(err => {
                console.error(err);
            })
        }else{
            const user = new UserProfile(newuser);
            user.save()
            .then(() => {
                res.send("profile created");
            })
            .catch(err => {
                console.error(err);
            })
        }
    })
    
   
})

router.get('/:displayname', (req, res) => {
    let displayname = req.params.displayname;
    UserProfile.findOne({displayname: displayname}, (err, user) => {
        if(user) {
            if(req.user.id == user.UserId){
            res.json({user: user, admin: true});
            }else{
                res.json({user: user, admin: false})
            }
        }else{
            console.error(err);
        }
        
    })
})

module.exports = router;