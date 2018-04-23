import config from './authconfig';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from '../models/user';

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        // const objUser = new User();
        // objUser.facebookId = profile.id;
        // objUser.email = profile.emails[0].value;
        // objUser.firstName = profile.name.familyName;
        // objUser.lastName = profile.name.givenName;
        // objUser.save();
        User.findOne({'google.id': profile.id}, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);
          const objUser = new User();
          objUser.facebook.id = profile.id;
          objUser.facebook.token = profile.token;
          objUser.firstName = profile.name.familyName;
          objUser.lastName = profile.name.givenName;
          objUser.save();
          return done(false, objUser, 'User has register');
        });
      }
    )
  );
};
