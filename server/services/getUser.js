import User from "../models/user";

export default async (req, res, next) => {
	const { _id } = req.query;
	let user
	
	try {
		user = await User.findOne({ _id }, { password: 0 }, { __v: 0 });
		if(!user) {
			return next({
				message:"Can't find user",
				status:400
			}) 
		} else {
			return next({
				message:"success",
				status:200
			}) 
		}
	}catch({message}) {
		return next({
			status: 400,
			message: "Not found",
		})
	}

}