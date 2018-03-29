import mongoose, {Schema} from 'mongoose';

const wishListShem = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  housesId: {type: Array}
});

export default mongoose.model('WishList', wishListShem);
