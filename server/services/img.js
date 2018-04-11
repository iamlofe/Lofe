import mongoose, { Schema } from "mongoose";
import Grid from "gridfs-stream";
import fs from "fs";
import Img from "../models/img"
import config from "../config/config"

let gfs;
let conn = mongoose.connection;



export default (req, res) => {
	// res.json({ file: req.file });
	res.json({ file: req.file });
	res.redirect('/');
};

	// gfs = Grid(config, conn);
	// let part = req.file;
	// console.log(part)
	// let writeStream = gfs.createWriteStream({
	// 	filename: 'img_' + part.name,
	// 	mode: 'w',
	// 	content_type: part.mimetype
	// });

	// writeStream.on('close', (file) => {
	// 	// checking for file
	// 	if (!file) {
	// 		res.status(400).send('No file received');
	// 	}
	// 	return res.status(200).send({
	// 		message: 'Success',
	// 		file: file
	// 	});
	// });
	// // using callbacks is important !
	// // writeStream should end the operation once all data is written to the DB 
	// writeStream.write(part.data, () => {
	// 	writeStream.end();
	// });


// //Constants
// var TARGET_PATH = path.resolve(__dirname, '../writable/');
// var IMAGE_TYPES = ['image/jpeg', 'image/png'];

// module.exports = {
// 	index: function (req, res, next) {
// 		res.render('index');
// 	},
// 	upload: function (req, res, next) {
// 		var is;
// 		var os;
// 		var targetPath;
// 		var targetName;
// 		var tempPath = req.files.file.path;
// 		//get the mime type of the file
// 		var type = mime.lookup(req.files.file.path);
// 		//get the extenstion of the file
// 		var extension = req.files.file.path.split(/[. ]+/).pop();

// 		//check to see if we support the file type
// 		if (IMAGE_TYPES.indexOf(type) == -1) {
// 			return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
// 		}

// 		//create a new name for the image
// 		targetName = uid(22) + '.' + extension;

// 		//determin the new path to save the image
// 		targetPath = path.join(TARGET_PATH, targetName);

// 		//create a read stream in order to read the file
// 		is = fs.createReadStream(tempPath);

// 		//create a write stream in order to write the a new file
// 		os = fs.createWriteStream(targetPath);

// 		is.pipe(os);

// 		//handle error
// 		is.on('error', function () {
// 			if (err) {
// 				return res.send(500, 'Something went wrong');
// 			}
// 		});
