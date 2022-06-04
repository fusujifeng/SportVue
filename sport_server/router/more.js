const express = require('express')
const router = express.Router()
const Chart = require('../models/Charts')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Presure = require("../models/Presure");
const Log = require("../models/Log")
const Tempure = require('../models/Tempure')
const Chat=require('../models/Chat')

//点击查看按钮后的整体图表
router.get('/demo1',(req,res) => {
    const query=req.query
    res.send({
        status:200,
        msg:"请求成功",
        data:query
    })
})

router.get('/demo2',(req,res) => {
    const query=req.query
    res.send({
        status:200,
        msg:"请求成功",
        data:query
    })
})

//查所有log
router.get('/demo3/:id',(req,res) => {
    Log.find().then(success => {

        return res.json({status:200,data:success})
    })
})

//保存聊天记录
router.post('/savechatrecord/',(req,res) => {
    console.log("post:"+ req)
    const newdata2={};
    newdata2.username=req.body.username
    newdata2.data=req.body.data
    console.log(newdata2)
    new Chat(newdata2).save().then((success) => {
        return res.json({status:200,data:success})
    })
})

//查看聊天记录

router.get('/showchatdata/:username',(req,res) => {
    Chat.find({username:req.params.username}).then((info)=>{
        return res.json({
            status:200,
            myINfo:info
        })
    }
    )

})

//删除所有笔记
router.delete('/deletechatdata/',(req,res) => {
    Chat.remove().then((succcess) => {
        return res.json({
            status:200,
            msg:'success'
        })
    })

})
module.exports=router
