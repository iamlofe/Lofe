import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcryptjs';

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({username}, (err, user) => {
        if (err)
          return next({
            status: 301,
            message
          });
        if (!user) {
          return done(null, false, {message: "User don't find"});
        }
        bcrypt.compare(password, user.password, function(err, isMath) {
          if (err) return done(err, false);
          if (isMath) {
            return done(null, user);
          }
          return done(null, false, {message: 'Wrong password or username'});
        });
      });
    })
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
