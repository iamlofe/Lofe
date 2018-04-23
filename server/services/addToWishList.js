import User from '../models/user';

export default async (req, res) => {
  const {houseId} = req.body;
  let session = req.session;
  console.log('houseId' + houseId);
  console.log('session' + session);
  let user;
  // try {
  //   await User.updateOne(
  //     {_id: session},
  //     {$push: {wishList: houseId, unique: true}}
  //   );
  // } catch ({message}) {
  //   return next({
  //     message: 'ddw',
  //     status: 331
  //   });
  // }
  res.send('success');
};
