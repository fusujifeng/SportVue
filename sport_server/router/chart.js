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
router.post('/addchartData/:id',(req,res) => {
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

//用户端的用户本人整体数据查询（表）-1
//刷出table,点查看前-------用的是id
//此处id是session里的id
router.get('/only-myinfo/:id',(req,res) => {
    Chart.find({id:req.params.id}).then((info)=>{
        return res.json({
            status:200,
            myINfo:info
        })
    })
})
//用户端的用户本人整体数据查询（表）-2
//点击查看按钮后的整体图表------用的是_id
//刷出echarts，点查看之后
router.get('/mychart/:_id',(req,res) => {
    Chart.findOne({_id:req.params._id}).then((info)=>{
        return res.json(
            {status:200,
             myINfo:info
            })
    })
})





//管理端的所有用户整体数据查询（表）
router.get('/allInfo',(req,res) => {
    Chart.find().then((info)=>{
        return res.json({
            status:200,
            myINfo:info
        })
    })
})



router.delete('/delete/:id',(req,res) => {
    Chart.deleteOne({_id:req.params.id}).then((succcess) => {
        return res.json({
            status:200,
            msg:'success'
        })
    })

})
module.exports = router
