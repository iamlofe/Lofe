import House from '../models/house';
import Comment from '../models/comments'

export default async (req, res, next) => {
	let _id = req.params.houseId;
	console.log(_id)
	let house, comments;
	try {
		house = await House.findOne({ _id }, { __v: 0 });
		res.send({ reviews: comments });
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}
};
