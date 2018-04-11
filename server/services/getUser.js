import User from "../models/user";

export default async (req, res, next) => {
	const { _id } = req.query;
	let user
	console.log(_id)

	try {
		user = await User.findOne({ _id }, { password: 0 }, { __v: 0 });
		if (!user) {
			return next({
				message: "Can't find user",
				status: 400
			})
		} else {
			res.send(user);
		}
	} catch ({ message }) {
		return next({
			status: 400,
			message: "Not found",
		})
	}

}