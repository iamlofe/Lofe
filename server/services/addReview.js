import Comment from '../models/comments';
import House from '../models/house'

export default async (req, res, next) => {
	const data = req.body;
	let houseId = req.body.houseId;

	let comment, house;
	try {
		comment = await Comment.create(data);
		house = await House.updateOne({ _id: houseId }, { $push: { commentsId: comment._id } });
	} catch ({ message }) {
		return next({
			status: 301,
			message
		});
	}
	console.log(comment);
	res.send('success');
};
