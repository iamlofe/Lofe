import User from '../models/user';

export default async (req, res) => {
  let _id = req.params.userId;

  let user;
  try {
    user = await User.findOne({_id}, {password: 0}, {__v: 0});
    res.send(user);
  } catch ({message}) {
    return next({
      status: 305,
      message
    });
  }
};
