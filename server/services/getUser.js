import User from "../models/user";

export default async (req, res, next) => {
	let { _id } = req.body;

	const user = await User.findOne({ _id }, { password: 0 });

	if (!user) {
		return next({
			status: 400,
			message: "User not found",
		})
	}
	res.send(user);

}