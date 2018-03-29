import User from '../models/user';

export default (req, res, next) => {
  delete req.session.authorized;
  delete req.session.user;
};
