const express = require('express')
const router = express.Router()
const Sport = require('../models/Sport')
const jwt = require('jsonwebtoken')
const passport = require('passport')


router.post('/addsport/:id',(req,res) => {
const newData = {}
newData.id = req.params.id
newData.height = parseFloat(req.body.height)
newData.weight = parseFloat(req.body.weight)
newData.sex = req.body.sex
newData.footDate = parseFloat(req.body.footDate)
newData.runDate = parseFloat(req.body.runDate)
newData.swimRhythmDate= parseFloat(req.body.swimRhythmDate)
newData.footRhythm= parseFloat(req.body.footRhythm)
newData.rnnhurt= parseFloat(req.body.rnnhurt)
newData.swimRhythmhurt= parseFloat(req.body.swimRhythmhurt)

//添加运动信息
new Sport(newData).save().then((success) => {
    return res.json({status:200,data:success})
})
})

//获取个人所有运动数据分析
router.get('/mysport/:id',(req,res) => {
    Sport.find({id:req.params.id}).then((success) => {
        return res.json({status:200,data:success})
    })
})

//获取单个运动数据
router.get('/sportinfo/:id',(req,res) => {
    Sport.findOne({_id:req.params.id}).then((success) => {
        return res.json({status:200,data:success})
    })
})

//删除单个运动数据
router.delete('/deletesport/:id',(req,res) => {
    Sport.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})


router.delete('/delete/:id',(req,res) => {
    Sport.deleteOne({_id:req.params.id}).then(()=>{
        return res.json({status:200})
    })
})
module.exports = router
