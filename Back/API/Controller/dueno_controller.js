'use strict'

var jwt = require('jsonwebtoken'),
    firebase = require('../model/server'),
    secret = require('../model/secret'),
    admin_payload = require('../model/admin_payload'),
    dueno_model = require('../model/dueno'),
    dueno_controller = () => {}
    //GETTERS
    dueno_controller.get_all = (req,res,next) =>{
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
                    dueno_model.get_all((cb)=>{
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
    dueno_controller.get_loc = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                var data =[]
                let aux
                dueno_model.get_all((cb)=>{
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
    //Get my data
    dueno_controller.get_my = (req,res,next) =>{
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
                    dueno_model.get_my(uid,(cb)=>{
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
    dueno_controller.get_my_premio = (req,res,next)=>{
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
                    dueno_model.get_my_premio(uid,(cb)=>{
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
    dueno_controller.get_my_data = (req,res,next)=>{
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
                    dueno_model.get_my_data(uid,(cb)=>{
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
    dueno_controller.put_new = (req,res,next) =>{
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
                    let gen_cult ={
                        uid : payload.uid,
                        datos : req.body.data,
                        local : req.body.local 
                    }
                    dueno_model.create_dueno(gen_cult,(cb)=>{
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
    dueno_controller.put_new_premio = (req,res,next) =>{
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
                    let gen_cult ={
                        uid : payload.uid,
                        premio : req.body.premio
                    }
                    dueno_model.new_premio(gen_cult,(cb)=>{
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
    //DELETE 
    dueno_controller.delete_premio = (req,res,next) =>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                let auth = firebase.auth()
                console.log(payload.uid)
                auth.getUser(payload.uid)
                .then(function(userRecord){
                    let gen_cult ={
                        uid : payload.uid,
                        premio_id : req.body.premio_id
                    }
                    //console.log(gen_cult)
                    dueno_model.delete_premio(gen_cult,(cb)=>{
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
    module.exports = dueno_controller