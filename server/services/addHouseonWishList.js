import User from '../models/user';

export default async (req, res) => {
  let {userId, houseId} = req.query;
  try {
    user = User.findOne({userId});
    user.wishList.push(houseId);
    res.send(1);
  } catch ({message}) {
    return next({
      status: 401,
      message
    });
  }
};
