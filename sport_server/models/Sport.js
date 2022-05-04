const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const SportSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    date:{
        type:Date,
        default: Date.now()
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    //慢走时间
    footDate:{
        type:Number,
        default:0
    },
    runDate:{
        type:Number,
        default:0
    },
    swimDate:{
        type:Number,
        default:0
    },
    footRhythm:{
        type:Number,
        default:70
    },
    runRhythm:{
        type:Number,
        default:180
    },
    swimRhythm:{
        type:Number,
        default:120
    }
})
module.exports = sport = mongoose.model('sport',SportSchema)
