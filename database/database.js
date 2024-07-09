const mysql = require('mysql2');
const config = require('../config/config.js');


const connection =  mysql.createConnection({
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASS,
    database: config.DBNAME,
    port:config.DBPORT
});

connection.addListener('error', (err)=>{
    console.log(err);
});

module.exports = { connection };