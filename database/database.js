const mysql = require('mysql2/promise');
const config = require('../config/config.js');

const configdb = {
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASS,
    database: config.DBNAME,
    port:config.DBPORT
};

const connection = await mysql.createConnection(configdb);


connection.connect( (err) =>{
    if(err) {
        console.error("Error en la conexion a la DB", err);
        return;
    }

    console.log("Conectado a la base datos MySQL2 desde database.js");
});

module.exports = { connection, configdb };
