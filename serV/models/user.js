import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt-node";

const userScheme = new Schema({
    name: {type:String, unique: true, lowercase: true, index: {unique: true}},
    password: {type:String},
})

userScheme.pre('save', async function(next) {
    let user = this;
    if(!this.isModified('password'))
        return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(e);

        bcrypt.hash(user.password, salt,null,function(err,hash){
            if(err) return next(e);

            user.password = hash;
            next()
        })
    });
    next();
})

userScheme.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userScheme)