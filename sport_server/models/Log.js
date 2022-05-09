const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const LogSchema = new Schema({
    // username:{
    //     type:String,
    //     required:true,
    // },
    // log:{
    //     type:String,
    //     required:true,
    //     default:"删除用户信息列表"
    // },
    // tempure:{
    //     type:Array,
    //     required:true
    // },
    // date:{
    //     type:Date,
    //     default: Date.now()
    // }

    temperature:{
        type:Array,
        default:[]
    },
    bloodSuger:{
        type:Array,
        default:[]
    },
    bloodPressure:{
        type:Array,
        default:[]
    },
    water:{
        type:Array,
        default:[]
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
module.exports = log = mongoose.model('log',LogSchema)
