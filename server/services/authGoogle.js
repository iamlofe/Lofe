import passport from 'passport';

export default function(req, res, next) {
  passport.authenticate('google', {scope: ['profile']});
}
