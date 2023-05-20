const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  }
})

// static signup method
userSchema.statics.signup = async function(email, password, base1, base2, is_admin, approved) {

  // validation

    if (!email || !password || !base1 || !base2) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        if (exists.approved === false) {
        throw Error('Account is already pending')
        }
    
        if (exists.approved) {
        throw Error('Account is already existing')
        }
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, image: base1, image2: base2, is_admin, approved })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  
  if (!match) {
    throw Error('Incorrect password')
  }

  if(!user.approved) {
    throw Error('User is not yet approved by the admin')
  }

  return user
}

module.exports = mongoose.model('libraryUsers', userSchema)