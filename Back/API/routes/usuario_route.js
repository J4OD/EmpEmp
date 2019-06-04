'use strict'

var usuario_controller = require('../controller/usuario_controller'),
    express = require('express'),
    router = express.Router()

    router.get('/user',verify,usuario_controller.get_all)
    router.get('/user/my',verify,usuario_controller.get_my)
    router.post('/user',verify,usuario_controller.put_new)
    
    //Verify TOKEN
/* Formato de los Headers
	Authorization: Bearer <access_token>*/
    function verify(req,res,next){
        let bearer_header = req.headers['authorization'],
            bearer,
            bearer_token
        // Revisa si es no definido
        if(typeof bearer_header != 'undefined'){
            //separa el bearer
            bearer = bearer_header.split(' ')
            // obtiene el token
            bearer_token = bearer[1]
            //lo almacena
            req.token = bearer_token
            //continua
            next()
        }else{
            res.json(403,{
                error: 1,
                msg: 'FORBIDDEN'
            })
        }
}
module.exports =router