const multer = require('multer')
const path = require('path')
require('dotenv').config()

const uploadDir = path.join(process.cwd(), process.env.uploadDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
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
