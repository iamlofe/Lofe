import Comment from '../models/comments';
import House from '../models/house'

export default async (req, res, next) => {
	const { username, description, advantages, disadvantages, rating, houseId } = req.body;

	let comment, house;
	try {
		comment = await Comment.create(username, description, advantages, disadvantages, rating);
		house = await House.updateOne({ _id: houseId }, { $push: { commentsId: comment._id } });
	} catch ({ message }) {
		return next({
			status: 301,
			message
		});
	}
	console.log(house);
	res.send('success');
};
