import User from '../models/user';

export default (req, res, next) => {
  const _id = req.body.id;

  User.findOne({_id}, (err, user) => {});
};
