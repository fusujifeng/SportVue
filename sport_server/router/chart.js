const express = require('express')
const router = express.Router()
const Chart = require('../models/Charts')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
router.post('/addcharDate/:id',(req,res) => {
    const newdata = {}
    newdata.temperature = req.body.temperature
    newdata.bloodSuger = req.body.bloodSuger
    newdata.bloodPressure = req.body.bloodPressure
    newdata.water = req.body.water
    newdata.id = req.params.id
    new Chart(newdata).save().then((success) => {
        return res.json({status:200,data:success})
    })
})
router.get('/mychart/:id',(req,res) => {
    Chart.findOne({_id:req.params.id}).then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})
router.get('/myinfo/:id',(req,res) => {
    Chart.find({id:req.params.id}).then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})
router.get('/allInfo',(req,res) => {
    Chart.find().then((info)=>{
        return res.json({status:200,myINfo:info})
    })
})
router.delete('/delete/:id',(req,res) => {
    Chart.deleteOne({_id:req.params.id}).then((succcess) => {
        return res.json({status:200,msg:'success'})
    })
})
module.exports = router