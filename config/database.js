var mysql = require('mysql2');
var fs    = require('fs-extra');
//var path  = require('path');

var db_config_file = './config/db-connection.js';
eval(fs.readFileSync(db_config_file).toString());


var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : db_config.host,
    user     : db_config.user,
    password : db_config.password,
    socketPath : db_config.socketPath,
    database : NODE_DATABASE,
    debug    :  false
});




// console.log(pool);
exports.pool = pool;