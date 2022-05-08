const express = require('express')
const router = express.Router()
const Chart = require('../models/Charts')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const Presure = require("../models/Presure");
const Log = require("../models/Log")
const Tempure = require('../models/Tempure')


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

module.exports=router
