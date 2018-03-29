import Comment from '../models/comments';

export default async (req, res, next) => {
	const data = req.body;
	let comment;
	try {
		comment = await Comment.create(data);
	} catch ({ message }) {
		return next({
			status: 301,
			message
		});
	}
	console.log(house);
	res.send('success');
};
