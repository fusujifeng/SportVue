const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const TempureSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    tempure:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = tempure = mongoose.model('tempure',TempureSchema)