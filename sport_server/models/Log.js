const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const LogSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    log:{
        type:String,
        required:true,
        default:"删除用户信息列表"
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = log = mongoose.model('log',LogSchema)
