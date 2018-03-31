import mongoose, { Schema } from "mongoose";
import Grid from "gridfs-stream";


export default async (req, res) => {

	Grid.mongo = mongoose.mongo;
	conn = mongoose.createConnection(`http://localhost:3030/img`);
	conn.once('open', function () {
		var gfs = Grid(conn.db);
		app.set('gridfs', gfs);
		// all set!
	});
}