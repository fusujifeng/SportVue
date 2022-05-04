//用户-体温血糖血压饮水单项填写数据

const express = require('express')
const router = express.Router()
const Presure = require('../models/Presure')
const Suger = require('../models/Suger')
const Tempure = require('../models/Tempure')
const Water = require('../models/Water')

//用户填写体温数据
router.post('/addtempure/:id',(req,res) => {
    const newData = {}
    newData.id = req.params.id
    newData.tempure = req.body
    new Tempure(newData).save().then(success => {
        return res.json({status:200,data:success})
    })
})
//根据id查询 所有体温数据
router.get('/mytempure/:id',(req,res) => {
    Tempure.find({id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})

//点击查看之后的表 表里的单项数据
router.get('/teminfo/:id',(req,res) => {
    Tempure.findOne({_id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})

//删除按钮（体温）
router.delete('/deletetem/:id',(req,res) => {
    Tempure.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})

//用户填写血糖数据
router.post('/addsuger/:id',(req,res) => {
    const newData = {}
    newData.id = req.params.id
    newData.suger = req.body
    new Suger(newData).save().then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/mysuger/:id',(req,res) => {
    Suger.find({id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/sugerinfo/:id',(req,res) => {
    Suger.findOne({_id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.delete('/deletesug/:id',(req,res) => {
    Suger.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})

router.post('/addpresure/:id',(req,res) => {
    const newData = {}
    newData.id = req.params.id
    newData.presure = req.body
    new Presure(newDate).save().then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/mypresure/:id',(req,res) => {
    Presure.find({id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/presureinfo/:id',(req,res) => {
    Presure.findOne({_id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.delete('/deletepre/:id',(req,res) => {
    Presure.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})
router.post('/addwater/:id',(req,res) => {
    const newData = {}
    newData.id = req.params.id
    newData.water = req.body
    new Water(newData).save().then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/mywater/:id',(req,res) => {
    Water.find({id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.get('/waterinfo/:id',(req,res) => {
    Water.findOne({_id:req.params.id}).then(success => {
        return res.json({status:200,data:success})
    })
})
router.delete('/deletewater/:id',(req,res) => {
    Water.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})
module.exports = router
