//引入模型模块

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./User')
const ChartsSchema = new Schema({
    temperature: {
        type: Array,
        default: []
    },
    bloodSuger: {
        type: Array,
        default: []
    },
    bloodPressure: {
        type: Array,
        default: []
    },
    water: {
        type: Array,
        default: []
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    date: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
    },
    location: {
        type: String,

    }

})
module.exports = Chart = mongoose.model('chart', ChartsSchema)
