import User from '../models/user';
import House from '../models/house';

export default async (req, res) => {
	let _id = req.body.session;

	let wishList, houses;
	try {
		wishList = await User.findOne({ _id }, { email: 0, password: 0, username: 0, __v: 0, _id: 0 });
		console.log(wishList)
		// houses = House.find({ wishList.wishList.toString() })
	} catch ({ message }) {
		return next({
			status: 402,
			message
		});
	}
	res.send(wishList)
};
