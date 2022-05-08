//管理员-用户数据列表

const express = require('express')
const router = express.Router()
const Chart = require('../models/Charts')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Presure = require("../models/Presure");
const Log = require("../models/Log")


//整体数据测绘-数据录入与测绘
router.post('/addcharData/:id',(req,res) => {
    const newdata = {}
    newdata.temperature = req.body.temperature
    newdata.bloodSuger = req.body.bloodSuger
    newdata.bloodPressure = req.body.bloodPressure
    newdata.water = req.body.water
    newdata.id = req.params.id

    //mongodb new了一个chart表 save存储数据到数据库里
    new Chart(newdata).save().then((success) => {
        return res.json({status:200,data:success})
    })
})

//点击查看按钮后的整体图表
router.get('/mychart/:id',(req,res) => {
    Chart.findOne({_id:req.params.id}).then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})

//用户端的用户本人整体数据查询（表）
router.get('/myinfo/:id',(req,res) => {
    Chart.find({id:req.params.id}).then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})

//管理端的所有用户整体数据查询（表）
router.get('/allInfo',(req,res) => {
    Chart.find().then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})
router.delete('/delete/:id',(req,res) => {
    console.log("dddf",res.data)

//先存再删
//     const newData2 = {}
//     newData2.temperature = res.params.temperature
//
//     console.log("tem"+newData2.temperature)
//     newData2.log = "删除列表"
//     new Log(newData2).save().then(success => {
//         return res.json({status:200,data:success})
//
//     })
    //再删
    Chart.deleteOne({_id:req.params.id}).then((succcess) => {
        return res.json({status:200,msg:'success'})
    })

})
module.exports = router
