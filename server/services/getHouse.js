import House from "../models/house";

export default async (req, res) => {
	let house;
	const _id = req.params.houseId;

	try {
		house = await House.find({ _id }, { reviews: 0 })
		res.send(house)
	} catch ({ message }) {
		return next({
			status: 401,
			message
		})
	}
}