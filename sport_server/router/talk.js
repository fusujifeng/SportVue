const express = require('express')
const router = express.Router()
const Talk = require('../models/Talk')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const passport = require('passport')
router.post('/add/:usID',passport.authenticate('jwt', { session: false }), (req, res) => {
    const card = {}
    if(req.body.yuanliao) card.yuanliao = req.body.yuanliao
    if(req.body.cp_name) card.cp_name = req.body.cp_name
    if(req.body.tiaoliao) card.tiaoliao = req.body.tiaoliao
    if(req.body.buzhou) card.buzhou = req.body.buzhou
    if(req.body.avator) card.avator = req.body.avator
    if(req.body.nickname) card.nickname = req.body.nickname
    if(req.body.img) card.img = req.body.img
    card.usID = req.params.usID
    new Talk(card).save().then( card => {
        return res.json({status:200,msg:'success'})
    }).catch((err) => {
        return res.json({status:500,err:err})
    })
})
router.get('/mytalklist/:usID',passport.authenticate('jwt', { session: false }), (req, res) => {
    Talk.find({usID:req.params.usID}).then((list)=>{
        return res.json({
            status:200,
            talkList:list
        })
    })
})
router.get('/alltalklist/:usID',(req, res) => {
    User.find({usID:req.params.usID}).then((user)=>{
        if(user){
            Talk.find().then((list)=>{
                return res.json({
                    status:200,
                    talkList:list
                })
            })
        }else{
            return res.json({status:404})
        }
    })
})
router.get('/talkinfo/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Talk.find({_id:req.params.id}).then((info)=>{
        return res.json({status:200,info:info})
    })
})
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Talk.findOneAndDelete({_id:req.params.id}).then(()=>{
        return res.json({status:200,msg:'success'})
    })
})
router.post('/modify/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    const card = {}
    if(req.body.yuanliao) card.yuanliao = req.body.yuanliao
    if(req.body.tiaoliao) card.tiaoliao = req.body.tiaoliao
    if(req.body.buzhou) card.buzhou = req.body.buzhou
    if(req.body.avator) card.avator = req.body.avator
    if(req.body.img) card.avator = req.body.img
    if(req.body.nickname) card.nickname = req.body.nickname
    Talk.findOneAndUpdate({_id:req.params.id},{$set:card},{new:true}).then(function(){
        return res.json({status:200,msg:'success'})
    })
})
module.exports = router