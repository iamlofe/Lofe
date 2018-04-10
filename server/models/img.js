import mongoose, { Schema } from "mongoose";

const imgShema = new Schema({
	img: { data: Buffer, contentType: String }
});

export default mongoose.model('Img', imgShema);