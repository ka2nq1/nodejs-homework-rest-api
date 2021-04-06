const express = require('express')
const router = express.Router()
const ctrlAvatar = require('../../controller/avatar')
const guard = require('../../helpers/guard')
const upload = require('../../helpers/fileUpload')

router.patch('/avatars', guard, upload.single('avatar'), ctrlAvatar.updateAvatar)

module.exports = router
