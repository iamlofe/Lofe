import House from '../models/house';
import fetch from 'node-fetch';

export default async (req, res, next) => {
	let pageData = req.body;
	const userId = req.session.user;
	let house;
	const formattedAddress = pageData.address.split(' ').join('+');
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=AIzaSyAPgp2up9kVOEq2H1wBDhmSS4EmHGdssbw`;

	pageData.userId = userId;
	try {
		await fetch(url)
			.then(data => data.json())
			.then(data => data.results[0].geometry.location)
			.then(coords => {pageData.coords = coords})
			.then(() => {house =  House.create(pageData); return house})
			.then(house => res.send(house));
		
	} catch ({ message }) {
		return next({
			status: 301,
			message
		});
	}
};
