'use strict'
var jwt = require('jsonwebtoken'),
    admin_payload = require('../model/admin_payload'),
    secret = require('../model/secret'),
    auth_controller = () =>{}

auth_controller.authenticate = (req,res,next)=>{
    let id = req.body.uid
    //holi
    let payload ={
        pass : admin_payload.pass,
        uid : id
    }
    jwt.sign(payload,secret.secret,(err,token) =>{
        res.json({token})
    })
}

module.exports = auth_controller