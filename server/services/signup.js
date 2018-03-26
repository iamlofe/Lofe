import User from "../models/user";

export default async (req, res, next) => {
	const creditionals = req.body;

	let user;

	try {
		user = await User.create(creditionals);
		req.session.user = user._id;
		res.send({
			status: "success",
			session: req.session,
		});
	} catch ({ message }) {
		return next({
			status: 400,
			message,
		});
	}
}