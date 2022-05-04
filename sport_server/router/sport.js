const express = require('express')
const router = express.Router()
const Sport = require('../models/Sport')
const jwt = require('jsonwebtoken')
const passport = require('passport')
router.post('/addsport/:id',(req,res) => {
const newDate = {}
newDate.id = req.params.id
newDate.height = parseFloat(req.body.height)
newDate.weight = parseFloat(req.body.weight)
newDate.sex = req.body.sex
newDate.footDate = parseFloat(req.body.footDate)
newDate.runDate = parseFloat(req.body.runDate)
newDate.swimRhythmDate= parseFloat(req.body.swimRhythmDate)
newDate.footRhythm= parseFloat(req.body.footRhythm)
newDate.rnnhurt= parseFloat(req.body.rnnhurt)
newDate.swimRhythmhurt= parseFloat(req.body.swimRhythmhurt)

//添加运动信息
new Sport(newDate).save().then((success) => {
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
