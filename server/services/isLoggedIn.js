import User from '../models/user';

export default async (req, res) => {
	const session = req.session;
	let user;
	try {
		user = User.findOne({ _id: session });
		if (!user) {
			return next({
				status: 304,
				message: "Can't find user"
			})
		} else if (user.isLogged) {
			res.send("true");
		} else {
			res.send("false");
		}
	} catch ({ message }) {
		return next({
			status: 302,
			message: "Error of search of user"
		})
	}
}