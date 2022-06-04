const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const ChatSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    chat:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = presure = mongoose.model('chat',ChatSchema)
