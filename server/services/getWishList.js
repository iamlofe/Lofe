import User from '../models/user';
import House from '../models/house';

export default async (req, res) => {
	let _id = req.body.session;

	let wishList, houses;
	try {
		wishList = await User.findOne({ _id }, { email: 0, password: 0, username: 0, __v: 0, _id: 0 });

		houses = await House.find({"_id": wishList.wishList});
		// houses.images.pop();
		
		// houses = houses.map(house => {return {...house, image: house.images[0]}});
		// houses = houses.map(house => {return{image: house.image, ...house._doc}});
		res.send(houses)
	} catch ({ message }) {
		return next({
			status: 402,
			message
		});
	}
};

// const arraId = wishList.wishList;

