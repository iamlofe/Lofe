import passport from 'passport';
import config from './authconfig';
import {Strategy as googleStatetegy} from 'passport-google-oauth20';
import User from '../models/user';

module.exports = function(passport) {
  passport.use(
    new googleStatetegy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({'google.id': profile.id}, (err, user) => {
          if (err) return done(err);
          if (!user) {
            const objUser = new User();
            objUser.google.id = profile.id;
            objUser.username = profile.displayName;
            objUser.google.name = profile.name.familyName;
            objUser.save(err => {
              if (err) console.log('eeerror');
            });
            return done(null, objUser, 'Register');
          } else {
            return done(null, user, 'Ok');
          }
        });
      }
    )
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
