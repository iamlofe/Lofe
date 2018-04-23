import passport from 'passport';

export default function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    console.log(user);

    if (err)
      return next({
        message: err
      });
    if (!user) {
      return next({
        status: 404,
        message: info.message
      });
    } else {
      res.send({user});
    }
  })(req, res, next);
}
