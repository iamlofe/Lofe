import House from '../models/house';

export default async (req, res, next) => {
	let house;
	let session = req.session;
	let search = req.body;
	try {
		house = await House.find({
			address: { $regex: search.q, $options: 'i' },
			price: { $gt: search.minprice, $lt: search.maxprice },
			rating: { $lt: search.maxrating, $gt: search.minrating },
			description: 0,
			coords: 0,
			advatages: 0,

		}).limit(15);
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}

	res.send(house);
};
