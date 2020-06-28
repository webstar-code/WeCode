const router = require('express').Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const GridStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to DB");
});
let gfs;
connection.once('open',() => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

let storage = new GridStorage({
    url: process.env.DB_CONNECTION,
    file: (req, file) => {
        return new Promise((resolve ,reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                let filename = buf.toString('hex') + path.extname(file.originalname);
                let fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo);
            })
        })
    }
})

let upload = multer({storage});

const UserProfile = require('../Schema/UserProfileSchema');

const authCheck = (req, res, next) => {
    console.log(req.user);
    if(!req.user) {
        res.send("Please login");
    }else{
        next();
    }
}


const Img = require('../Schema/ImgSchema');

router.post('/upload', upload.single('file'), (req, res) => {
    const image = new Img({
        // Userid: req.user.id,
        ProfileImgref: req.file.id
    })
    image.save().then(() => {
        res.status(200).json("Image Added");
    })
    
})


// router.post('/userprofile',upload.single('file'), (req, res) => {
//     const newuser = {
//         UserId: req.user.id,
//         displayname: req.body.displayname,
//         name: req.body.name,
//         about: req.body.about,
//         profession: req.body.profession,
//         university: req.body.university,
//         ImageRef: req.file.id
//     };

//     UserProfile.findOne({displayname: req.body.displayname}, (err, user) => {
//         if(user) {
//             user.replaceOne(newuser)
//             .then(() => {
//                 res.send("profile updated");
//             })
//             .catch(err => {
//                 res.status(500).json('Internal Server Error');
//                 console.error(err);
//             })
//         }else{
//             const user = new UserProfile(newuser);
//             user.save()
//             .then((data) => {
//                 res.json(data);
//             })
//             .catch(err => {
//                 res.status(500).json('Internal Server Error');
//                 console.error(err);
//             })
//         }
//     }) 
// })

// router.get('/userprofile/:displayname', authCheck, (req, res) => {
//     let displayname = req.params.displayname;
//     // console.log(req.user.id);
//     UserProfile.findOne({displayname: displayname}, (err, user) => {
//         // if(user) {
//         //     res.json(user);
//         // }else{
//         //     res.json(err);
//         // }
        
//         if(user) {
//             if(req.user.id == user.UserId){
//                 gfs.files.findOne({id: user.ImageRef}, (err, file) => {
//                 res.json({user: user,profileImg: file ,admin: true});
                    
//                 })
//             }else{
//                 gfs.files.findOne({id: user.ImageRef}, (err, file) => {
//                     res.json({user: user,profileImg: file ,admin: false});
                        
//                     })

//             }
//         }else{
//             console.error(err);
//             res.send("user not exists.");
//         }
        
//     })
// })
module.exports = router;

