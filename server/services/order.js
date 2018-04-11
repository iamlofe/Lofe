import House from "../models/house"

export default async (req, res) => {
	const _id = req.params.houseId;
	let house;
	try {
		house = await House.updateOne({ _id }, { $set: { status: "pending" } });
	} catch ({ message }) {
		return next({
			status: 302,
			message,
		})
	}
}