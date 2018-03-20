import mongoose, {Schema} from "mongoose";

const pagesSchem = new Schema({
    title: {type:String, require:true},
    adress: {type:String, require:true},
    description: {type:String, require:true},
    advantages: {type:String},
    price: {type:Number, require:true},
    urlPhotos: {type:String},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}

})

export default mongoose.model('Pages', pagesSchem);

// цена(цифры и валюта)
// адресс
// описание
// преимущества
// и фотки