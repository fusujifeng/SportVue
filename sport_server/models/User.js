const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    //账号类型
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }

})
module.exports = user = mongoose.model('user',UserSchema)
