import mongoose, {Schema} from 'mongoose';

const commentSchem = new Schema({
  username: {type: String, required: true},
  description: {type: String, required: true},
  advantages: {type: String},
  disadvantages: {type: String},
  rating: {type: Number},
  houseId: {type: String}
});

export default mongoose.model('Comment', commentSchem);
