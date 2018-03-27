import User from "../models/user";

export default (req, res, next) => {
	delete req.session.authorized;
	delete req.session.user;
	res.redirect('http://localhost:3000')
}