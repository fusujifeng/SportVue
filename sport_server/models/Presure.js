const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const PresureSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    presure:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = presure = mongoose.model('presure',PresureSchema)