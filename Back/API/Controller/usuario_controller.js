'use strict'

var jwt = require('jsonwebtoken'),
    firebase = require('../model/server'),
    secret = require('../model/secret'),
    admin_payload = require('../model/admin_payload'),
    usuario_model = require('../model/usuario'),
    usuario_controller = () => {}
    //GETTERS
    usuario_controller.get_all = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                let auth = firebase.auth()
                auth.getUser(payload.uid)
                .then(function(userRecord){
                    usuario_model.get_all((cb)=>{
                        if(cb.val!=null){
                            res.json(cb.val())
                        }else{
                            res.json(cb.code)
                        }
                    })
                })
                .catch(function(error){
                    res.json(404,{
                        error: 1,
                        msg: 'No Encontrado'
                    })
                })
            }else{
                res.json(401,{
                    error: 1,
                    msg: 'No Autorizado'
                })
            }
        })
    }
    //Get my data
    usuario_controller.get_my = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                let auth = firebase.auth()
                auth.getUser(payload.uid)
                .then(function(userRecord){
                    let uid = payload.uid
                    usuario_model.get_my(uid,(cb)=>{
                        if(cb.val!=null){
                            res.json(cb.val())
                        }else{
                            res.json(cb.code)
                        }
                    })
                })
                .catch(function(error){
                    res.json(404,{
                        error: 1,
                        msg: 'No Encontrado'
                    })
                })
            }else{
                res.json(401,{
                    error: 1,
                    msg: 'No Autorizado'
                })
            }
        })
    }
    //CREATE 
    //crear/actualizar usuario
    usuario_controller.put_new = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                let auth = firebase.auth()
                auth.getUser(payload.uid)
                .then(function(userRecord){
                    let user ={
                        uid : payload.uid,
                        datos : req.body.data
                    }
                    usuario_model.create_usuario(user,(cb)=>{
                        if(cb!=null){
                            res.json(cb.code)
                        }else{
                            res.json(200,{msg:'Actualizado Correctamente'})
                        }
                    })
                })
                .catch(function(error){
                    res.json(404,{
                        error: 1,
                        msg: 'No Encontrado'
                    })
                })
            }else{
                res.json(401,{
                    error: 1,
                    msg: 'No Autorizado'
                })
            }
        })
    }

    module.exports = usuario_controller