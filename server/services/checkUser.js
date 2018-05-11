import mongoose, {Schema} from 'mongoose';
import User from '../models/user';

export default (req, res) => {
  const id = req.body.session;
  User.findById(id).then(
    user => (user != null ? res.send(true) : res.send(false)),
    () => res.send('2')
  );
};
