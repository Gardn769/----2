const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const User = require("../database/entity/user")
const {createHash} = require("crypto")


const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({
      username,
    })
    if (!user) {
      console.error('user no found');
      return done(null, false)
    }

    if (user.password !== password) {
      console.error('incorrect password');
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    console.error(error)
    return done(error)
  }
}

const options = {
  usernameField: "username",
  passwordField: "password",
}

passport.use(new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser( async (id, cb) => {
  try {
    const user = await User.findById(id)
    cb(null, user)
  } catch (error) {
    console.error(error)
    return cb(err)
  }
})

module.exports = passport