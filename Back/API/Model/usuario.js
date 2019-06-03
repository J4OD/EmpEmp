var firebase = require('./server');
var db = firebase.database().ref('usuarios');
var usuario ={ //CRUD
    //READ
    get_all:function(callback){
        return db.once('value',callback,callback);
    },
    get_my:function(uid,callback){
        let ref = db.child(uid);
        return ref.once('value',callback,callback);
    },
    //CREATE
    create_usuario:function(user,callback){
        let ref = db.child(user.uid);
        return ref.update({datos:user.datos},callback);
    }
};
module.exports = usuario;
