const mysql = require('mysql2');
const config = require('../config/config.js');


const connection = mysql.createConnection({
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASS,
    database: config.DBNAME,
    port:config.DBPORT
});

connection.connect( (err)=>{
    if (err) {
        console.error('La base de datos no pudo ser alcanzada', err);
        return;
    }
    console.log('La base de datos se conectó con éxito');
});

module.exports = connection;