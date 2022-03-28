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
    foothurt:{
        type:Number,
        default:70
    },
    runhurt:{
        type:Number,
        default:180
    },
    swimhurt:{
        type:Number,
        default:120
    }
})
module.exports = sport = mongoose.model('sport',SportSchema)