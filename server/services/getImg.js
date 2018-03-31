import mongoose, { Schema } from "mongoose";
import Img from "../models/img";


export default async (req, res) => {
	var a = new Img;

	a.findById(a, function (err, doc) {
		if (err) return next(err);
		res.contentType(doc.img.contentType);
		res.send(doc.img.data);
	}