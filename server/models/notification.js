import mongoose, {Schema} from 'mongoose';

const notificationSchema = new Schema({
  title: {type: String},
  message: {type: String},
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  recipient: {type: String},
  action: {type: Boolean},
  time: {type: Date, default: Date.now()}
});

export default mongoose.model('Notification', notificationSchema);
