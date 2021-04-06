const multer = require('multer')
require('dotenv').config()
const { UPLOAD_DIR } = require('./uploadPath')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}.jpg`)
  },
  limits: {
    fileSize: 2000000,
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  }
})

module.exports = upload
