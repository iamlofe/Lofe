import User from '../models/user';

export default async (req, res) => {
	const { houseId, session } = req.body;
	console.log(req.body);
	let user;
	try {
		await User.updateOne({ _id: session }, { $pull: { wishList: houseId } });
	} catch ({ message }) {
		return next({
			message: 'ddw',
			status: 231
		});
	}
	res.send(user);
};
