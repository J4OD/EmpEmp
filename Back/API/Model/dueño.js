var firebase = require('./server');
var db = firebase.database().ref('dueños');
var dueño ={
    get_all:function(callback){
        return db.once('value',callback,callback);
    }
};
module.exports = dueño;
