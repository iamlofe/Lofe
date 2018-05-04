import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcryptjs';

// export default function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err)
//       return next({
//         message: err
//       });
//     if (!user) {
//       return next({
//         status: 404,
//         message: info.message
//       });
//     } else {
//       req.session.authorized = true;
//       req.session.user = user._id;
//       console.log(req.session);
//       req.session.save(err => {

//         if (err) console.log('error');
//       });
//       res.send({
//         status: 'success',
//         session: req.session
//       });
//     }
//   })(req, res, next);
// }

export default (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({username}, (err, user) => {
    if (err)
      return next({
        status: 301,
        message: err
      });
    if (!user) {
      res.send({
        status: 'err'
      });
    }
    bcrypt.compare(password, user.password, function(err, isMath) {
      if (err)
        res.send({
          status: 301,
          message: err
        });
      if (isMath) {
        console.log(req.cookies);
        console.log('<- cooookieee');
        req.session.authorized = true;
        req.session.user = user._id;
        console.log(req.session);
        req.session.save(err => {
          if (err) console.log('error');
        });
        res.send({
          status: 'success',
          session: req.session
        });
      } else {
        res.send({
          status: 401,
          message: 'password or username wrong'
        });
      }
    });
  });
};
