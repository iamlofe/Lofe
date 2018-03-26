import House from '../models/house';

export default async (req, res, next) => {
	let house;
	let search = req.query;
	try {
		if (!search.q) {
			house = await House.find({
				price: { $gte: search.minprice },
				price: { $lte: search.maxprice },

			});
			console.log(1);
			console.log(search);
		} else {
			house = await House.find({
				address: new RegExp('^' + search.q, 'i'),
				price: { $gte: search.minprice },
				price: { $lte: search.maxprice },
				rating: { $lte: search.maxrating },
				rating: { $gte: search.minrating }
			});
		}
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}

	res.send(house);
};
