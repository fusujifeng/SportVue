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
newDate.swimDate= parseFloat(req.body.swimDate)
newDate.foothurt= parseFloat(req.body.foothurt)
newDate.rnnhurt= parseFloat(req.body.rnnhurt)
newDate.swimhurt= parseFloat(req.body.swimhurt)
new Sport(newDate).save().then((success) => {
    return res.json({status:200,data:success})
})
})
router.get('/mysport/:id',(req,res) => {
    Sport.find({id:req.params.id}).then((success) => {
        return res.json({status:200,data:success})
    })
})
router.delete('/deletesport/:id',(req,res) => {
    Sport.deleteOne({_id:req.params.id}).then(() => {
        return res.json({status:200})
    })
})
router.get('/sportinfo/:id',(req,res) => {
    Sport.findOne({_id:req.params.id}).then((success) => {
        return res.json({status:200,data:success})
    })
})
router.delete('/delete/:id',(req,res) => {
    Sport.deleteOne({_id:req.params.id}).then(()=>{
        return res.json({status:200})
    })
})
module.exports = router