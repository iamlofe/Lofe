import User from "../models/user";

export default async (req, res, next) => {
	const { _id } = req.query;
	const user = await User.findOne({ _id }, { password: 0 }, { __v: 0 });
	
	if (!user) {
		return next({
			status: 400,
			message: "User not found",
		})
	}
	res.send(user);

}