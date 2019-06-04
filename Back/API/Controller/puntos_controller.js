'use strict'

var jwt = require('jsonwebtoken'),
    secret = require('../model/secret'),
    admin_payload = require('../model/admin_payload'),
    puntos_model = require('../model/puntos'),
    puntos_controller = () => {}

    puntos_controller.get_all = (req,res,next)=>{
        jwt.verify(req.token,secret.secret,(err,payload)=>{
            if(err){
                res.json(403,{
                    error: 1,
                    msg: 'FORBIDDEN'
                })
            }else if(payload.pass == admin_payload.pass){
                puntos_model.get_all((cb)=>{ //cb = callback
                    if(cb.val!=null){
                        res.json(cb.val())  //Existen datos
                    }else{
                        res.json(404,cb.code) //No existen datos, algo malo paso
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
   
module.exports = puntos_controller