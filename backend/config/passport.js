const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require('dotenv').config()

const User = require("../models/User");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JWTStrategy(opts, async (jwtPayLoad, done) => {
    console.log("JWT Payload ID:", jwtPayLoad._id);
    try {
      const user = await User.findById(jwtPayLoad._id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
