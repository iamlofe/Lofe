import House from '../models/house';
import Comment from '../models/comments'

export default async (req, res, next) => {
	let { _id } = req.query;
	console.log(_id)
	let house, comment;
	try {
		house = await House.findOne({ _id }, { __v: 0 });
		comment = await Comment.find({ _id: house.reviews })

		res.send({ house, comment })
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}
};
