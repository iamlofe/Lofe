import House from '../models/house';

export default async (req, res, next) => {
	let houses;
	let wishList;
	let session = req.session;
	let search = req.query;
	try {
		await House.find({
			address: { $regex: search.q, $options: 'i' },
			price: { $gt: search.minprice, $lt: search.maxprice },
			rating: { $lt: search.maxrating, $gt: search.minrating }
		}, function (err, results) {
			houses = results.map(result => { return { isLiked: false, price: result.price, id: result._id, rating: result.rating, image: result.images[0] } })
		}).limit(15);

		await User.findOne({ _id: session }, function (err, user) {
			houses = houses.map(house => { return { ...house, isLiked: user.wishList.indexOf(house.id) === -1 ? false : true } });
		})
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}
	res.send(houses);
};
