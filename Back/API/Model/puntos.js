var firebase = require('./server');
var db = firebase.database().ref('puntos');
var puntos ={
    //CRUD

    //READ
    get_all:function(callback){
        return db.once('value',callback,callback);
    }
};
module.exports = puntos;