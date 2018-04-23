import User from '../models/user';

export default (req, res, next) => {
  const data = req.body;
  const _id = req.body.id;

  User.findOne({_id}, (err, user) => {
    // res.send(user);
    user.set({...data});
    user.save();
    res.send(user);
  });
};
