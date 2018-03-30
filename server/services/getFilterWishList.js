import User from '../models/user';
import House from '../models/house';

export default async (req, res) => {
	let _id = req.body.session;
	let ids = req.body.ids;

	let wishList, houses;
	let result = [];
	try {
		wishList = await User.findOne({ _id }, { email: 0, password: 0, username: 0, __v: 0, _id: 0 });

		for(let i = 0; i < ids.length; i++) {
			if(wishList.wishList.includes(ids[i])) {
				result.push(ids[i])
			}
		}

		// ids.forEach(id => {result.push(id)});
		res.send(result);
	} catch ({ message }) {
		return next({
			status: 402,
			message
		});
	}
};
