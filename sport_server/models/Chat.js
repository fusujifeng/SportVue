const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Chat = require('./Chat')
const User = require("../models/User");

const ChatSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    username:{
        type:String
    },
    data:{
        type:Array,
        // required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = presure = mongoose.model('Chat',ChatSchema)
