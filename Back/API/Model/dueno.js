var firebase = require('./server');
var db = firebase.database().ref('dueños');
var dueno ={ //CRUD
    //READ
    get_all:function(callback){
        return db.once('value',callback,callback);
    },
    get_my:function(uid,callback){
        let ref = db.child(uid);
        return ref.once('value',callback,callback);
    },
    get_my_premio:function(uid,callback){
        let ref = db.child(uid).child('premios');
        return ref.once('value',callback,callback);
    },
    get_my_data:function(uid,callback){
        let ref = db.child(uid).child('datos');
        return ref.once('value',callback,callback);
    },
    //CREATE
    create_dueno:function(gen_cult,callback){
        let ref = db.child(gen_cult.uid);
        return ref.update({datos:gen_cult.datos,local:gen_cult.local},callback);
    },
    //UPADTE
    new_premio:function(gen_cult,callback){
        let ref = db.child(gen_cult.uid).child('premios');
        //console.log(ref.key());
        return ref.push(gen_cult.premio,callback);
    },
    //DELETE
    delete_premio:function(gen_cult,callback){
        let ref = db.child(gen_cult.uid).child('premios').child(gen_cult.premio_id);
        return ref.remove(callback);
    }
};
module.exports = dueno;
