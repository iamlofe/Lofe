import mongoose, { Schema } from "mongoose";
import User from "../models/user"


export default async (req, res) => {
	const id = res.query._id;
	let user;
	try {
		user = User.findOne({ id });
		if (user);
	} catch ({ message }) {
		return next({
			status: 302,
			message: "User has not found"
		})
	}
	res.send(1);
}