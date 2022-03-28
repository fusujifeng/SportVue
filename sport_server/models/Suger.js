const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const SugerSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    suger:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = suger = mongoose.model('suger',SugerSchema)