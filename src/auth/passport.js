const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("../database/entity/user")
const {createHash}= require("crypto")


async function signin(email, password, cb) {
  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return cb(null, false);
    }
    const passwordHash = createHash('md5').update(password).digest('hex');
    if (passwordHash !== user.passwordHash) {
      return cb(null, false);
    }

    return cb(null, user);
  } catch (error) {
    return cb(error, false);
  }
}

module.exports = function initPassport(passport) {
  passport.serializeUser((user, cb) => {
    return cb(null, user._id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id)
      return cb(null, user._id);
    } catch (error) {
      return cb(error, null);
    }
  });

  passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, signin));
}
