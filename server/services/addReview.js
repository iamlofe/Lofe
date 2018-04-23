import Comment from '../models/comments';
import House from '../models/house';

export default async (req, res, next) => {
  const data = req.body;
  let houseId = req.params.houseId;
  console.log(data);

  let comment, house;
  try {
    comment = await Comment.create({...data, houseId});
    house = await House.updateOne(
      {_id: houseId},
      {$push: {reviews: comment._id}}
    );
  } catch (e) {
    return next({
      status: 301,
      message: "Can't create a comment. " + e
    });
  }
  res.send('success');
};
