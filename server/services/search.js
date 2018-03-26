import House from '../models/house';

export default async (req, res, next) => {
	let house;
	let search = req.query;
	try {
		if (!search.q) {
			house = await House.find({
				price: { $gte: search.minprice, $lte: search.maxprice },
				rating: { $lte: search.maxrating, $gte: search.minrating },
			}).limit(15);
		} else {
			house = await House.find({
				address: { $regex: search.q, $options: 'i' },
				price: { $gt: search.minprice, $lt: search.maxprice },
				rating: { $lt: search.maxrating, $gt: search.minrating },
			}).limit(15);
		}
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}

	res.send(house);
};
