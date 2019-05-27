'use strict'

var jwt = require('jsonwebtoken'),
    firebase = require('../model/server'),
    secret = require('../model/secret'),
    admin_payload = require('../model/admin_payload'),
    dueño_model = require('../model/dueño'),
    dueño_controller = () => {}

    dueño_controller.get_all = (req,res,next) =>{
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
                    dueño_model.get_all((cb)=>{
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
    //Esta trae todos los locales
    dueño_controller.get_loc = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                var data =[]
                let aux
                dueño_model.get_all((cb)=>{
                    if(cb.val!=null){
                        cb.forEach(function(child_snap){
                            //child_snap me trae la información como arreglo
                            aux = child_snap.child("local")
                            //console.log(aux.val)
                            data.push(aux.val())
                        })
                        res.json(data)
                    }else{
                        res.json(cb.code)
                    }
                })
            }else{
                res.json(401,{
                    error: 1,
                    msg: 'No Autorizado'
                })
            }
        })
    }

    module.exports = dueño_controller