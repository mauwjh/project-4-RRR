const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require("bcrypt");
const pool = require("../db");
require('dotenv').config()

const initializePassport = (passport) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        const userFound = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [username]
        );
        if (!userFound.rows[0]) {
          done(null, false, { message: "No user with that email found" });
        }
        try {
          if (bcrypt.compareSync(password, userFound.rows[0].password)) {
            done(null, userFound.rows[0]);
          } else {
            done(null, false, {
              message: "Password incorrect",
            });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret 
  }, (payload, done) => {
    try{
      done(null, payload)
    } catch (error) {
      done(null, error)
    }
  }))
};


module.exports = initializePassport;
