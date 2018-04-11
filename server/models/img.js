import mongoose, { Schema } from "mongoose";

const imgShema = new Schema({
	originalname: { type: String },
	mimetype: { type: String },
	buffer: { type: Buffer },
	size: { type: Number }
});

export default mongoose.model('Img', imgShema);