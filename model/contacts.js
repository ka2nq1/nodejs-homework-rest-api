const mongoose = require('mongoose')
const { Schema } = mongoose

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    subscription: { type: String },
    password: {
      type: String,
      required: true,
    },
    token: { tupe: String },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contact)

module.exports = Contact
