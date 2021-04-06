const fs = require('fs').promises
const path = require('path')
const jimp = require('jimp')
const User = require('../model/schema/user')
const { STORE_IMG } = require('../helpers/uploadPath')

const createAvatar = async (id, file) => {
  const name = `${id}.jpg`
  const image = await jimp.read(file)
  await image
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_TOP)
    .writeAsync(file)
  await fs.rename(file, path.join(STORE_IMG, name))

  const avatar = `http://localhost:3000/avatars/${name}`
  return avatar
}

const updateAvatar = async (req, res, next) => {
  const id = req.user.id
  const file = req.file.path

  try {
    const url = await createAvatar(id, file)
    await User.updateOne({ _id: id }, { avatarURL: url })
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: url,
      }
    })
  } catch (err) {
    await fs.unlink(file)
    return next(err)
  }
}

module.exports = { updateAvatar }
