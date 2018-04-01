import Comment from '../models/comments';

export default async (req, res) => {
	const arr = req.body.houseId;

	let comments
	try {

		comments = Comments.find({ _id: arr });
		res.send(comments)
	} catch ({ message }) {
		return next({
			status: 320,
			message
		})
	}
}