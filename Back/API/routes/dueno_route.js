'use strict'

var dueno_controller = require('../controller/dueno_controller'),
    express = require('express'),
    router = express.Router()

    router.get('/gen_cult',verify,dueno_controller.get_all)
    router.get('/gen_cult/loc',verify,dueno_controller.get_loc)
    router.get('/gen_cult/my',verify,dueno_controller.get_my)
    router.get('/gen_cult/my/premio',verify,dueno_controller.get_my_premio)
    router.get('/gen_cult/my/datos',verify,dueno_controller.get_my_data)
    router.post('/gen_cult',verify,dueno_controller.put_new)
    router.put('/gen_cult/my/premio',verify,dueno_controller.put_new_premio)
    router.delete('/gen_cult/premio',verify,dueno_controller.delete_premio)
    
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