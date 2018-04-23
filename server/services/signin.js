import passport from 'passport';

export default function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
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
      req.logIn(user, function(err) {
        if (err)
          return next({
            message: err
          });
      });
      // console.log(req.session);
      res.send({user});
    }
  })(req, res, next);
}
