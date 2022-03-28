const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const WaterSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    water:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = water = mongoose.model('water',WaterSchema)