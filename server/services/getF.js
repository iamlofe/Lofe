import User from '../models/user';

export default async (req, res) => {
  let _id = req.body._id;
  let user;
  try {
    user = await User.findOne({_id});
  } catch ({message}) {
    return next({
      status: 402,
      message
    });
  }
  res.send(user);
};
