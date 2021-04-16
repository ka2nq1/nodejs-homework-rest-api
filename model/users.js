const User = require('./schema/user')

const findUserById = async (id) => {
  const userById = await User.findById(id)
  return userById
}

const findUserByEmail = async (email) => {
  const userByEmail = await User.findOne(email)
  return userByEmail
}

const addUser = async (body) => {
  const newUser = await new User(body).save()
  return newUser
}

const updateToken = async (id, token) => {
  const newToken = await User.updateOne({ _id: id }, { token })
  return newToken
}

const patchAvatar = async (id, avatar) => {
  const user = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
  return user
}

const findByVerifyToken = async (token) => {
  const user = await User.findOne({ verifyToken: token })
  return user
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  const user = await User.findByIdAndUpdate(id, { verify, verifyToken })
  return user
}

module.exports = {
  findUserById,
  findUserByEmail,
  addUser,
  updateToken,
  patchAvatar,
  findByVerifyToken,
  updateVerifyToken
}
