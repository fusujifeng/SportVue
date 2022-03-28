const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const User = require('./User.js')
const TalkSchema = new Schema({
    cp_name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    yuanliao:{
        type:Array,
        required:true
    },
    tiaoliao:{
        type:Array,
        required:true
    },
    buzhou:{
        type:Array,
        required:true
    },
    usID:{
        type:Schema.Types.ObjectId,
        ref: User
    },
    avator:{
        type:String
    },
    img:{
        type:Array,
        require:true
    },
    nickname:{
        type:String
    }
})
module.exports = talk = mongoose.model('talk',TalkSchema)