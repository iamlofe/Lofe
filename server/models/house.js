import mongoose, {Schema} from "mongoose";

const pagesSchem = new Schema({
    title: {type:String, require:true},
    address: {type:String, require:true},
    description: {type:String, require:true},
    advantages: {type:Array},
    price: {type:Number, require:true},
    urlPhotos: {type:Array, default:"https://www.google.by/search?q=photos&tbm=isch&source=iu&ictx=1&fir=8Yzq_mUke5UEwM%253A%252CfD4CS8xZrXkeVM%252C_&usg=__nHyLPKGlbWcTLuSjYVyWd6Z3b5E%3D&sa=X&ved=0ahUKEwjPl8Wz-YLaAhWEEywKHZ5rAMUQ9QEIOjAF#imgrc=MHkGQLGnKUWv2M:"},
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating:{type:Number, default:0},
    comments:{type:Array}

})

export default mongoose.model('House', pagesSchem);

// цена(цифры и валюта)
// адресс
// описание
// преимущества
// и фотки