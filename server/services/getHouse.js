import House from '../models/house';

export default async (req, res, next) => {
	let { _id } = req.query;
	console.log(_id)
	let house;
	try {
		house = await House.findOne({ _id }, { __v: 0 });
		res.send(house);
	} catch ({ message }) {
		return next({
			message: "Can't get all pages",
			status: 302
		});
	}
};
