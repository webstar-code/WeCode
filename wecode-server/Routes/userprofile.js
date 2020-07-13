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

// upload the image
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log("file uploaded");

    res.json(req.file);
})

// Get Image by Id and return the image 
router.get('/image/:file_id', (req, res) => {
    gfs.files.findOne({_id: new mongoose.Types.ObjectId(req.params.file_id)}, (err, file) => {
      if(!file || file.length === 0) {
        return res.status(404).json({
          err: "cannot find file"
        });
      }
      const readStream = gfs.createReadStream(file);
      readStream.pipe(res); 
  
    })
  })

module.exports = router;

