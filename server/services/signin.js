import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export default async (req, res, next) => {
	let { username, password } = req.body;

	const user = await User.findOne({ username });

	if (!user) {
		return next({
			status: 400,
			message: 'User not found'
		});
	}
	try {
		const result = await user.comparePasswords(password);

		if (password !== user.password) {
			return next({
				status: 401,
				message: 'encorrect'
			});
		} else {
			req.session.authorized = true;
			req.session.user = user._id;
			console.log(req.session)
			User.updateOne({ _id: req.session }, { $set: { isLogged: true } });
			res.send({
				status: 'success',
				session: req.session
			});
		}
	} catch ({ message }) {
		return next({
			status: 401,
			message
		});
	}
};
