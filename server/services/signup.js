import User from '../models/user';
import bcrypt from 'bcrypt';
import flash from 'connect-flash';

export default (req, res, next) => {
  const data = req.body;

  let objUser;

  objUser = new User({
    username: data.username,
    email: data.email,
    password: data.password
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(objUser.password, salt, function(err, hash) {
      if (err) {
        return next({
          status: 401,
          message
        });
      }
      objUser.password = hash;
      console.log(objUser);
      objUser.save(err => {
        if (err)
          return next({
            status: 401,
            message: 'Dublicate username or email'
          });
        res.send({
          status: 'success'
        });
      });
    });
  });
};
