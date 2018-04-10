import mongoose, {Schema} from 'mongoose';

const houseSchem = new Schema({
  title: {type: String},
  address: {type: String},
  description: {type: String},
  advantages: {type: Array},
  price: {type: Number},
  images: {
    type: Array,
    default:
      'https://www.google.by/search?q=photos&tbm=isch&source=iu&ictx=1&fir=8Yzq_mUke5UEwM%253A%252CfD4CS8xZrXkeVM%252C_&usg=__nHyLPKGlbWcTLuSjYVyWd6Z3b5E%3D&sa=X&ved=0ahUKEwjPl8Wz-YLaAhWEEywKHZ5rAMUQ9QEIOjAF#imgrc=MHkGQLGnKUWv2M:'
  },
  ovnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: {type: Number, default: 0},
  coordinates: {type: String},
  reviews: {type: Array},
  coords: {
    lat: {type: String},
    lng: {type: String}
  },
  averageRating: {type: Number},
  reviewsNumber: {type: Number},
  status: {type: String},
  time: {type: Date, default: Date.now()}
});

export default mongoose.model('House', houseSchem);
