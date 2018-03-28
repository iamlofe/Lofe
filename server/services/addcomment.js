import Comment from "../models/comments";

export default async (req, res, next) => {
	const objComment = req.body;

	let comment;
	try {
		comment = await Comment.create(objComment);

	} catch ({ message }) {
		return next({
			status: 400,
			message,
		});
	}
	res.send(comment)
}