//configuracion de variables que no van a compartirse.

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST ,
    PORT: process.env.PORT ,
    DBHOST: process.env.DBHOST ,
    DBUSER: process.env.DBUSER ,
    DBPASS: process.env.DBPASS ,
    DBNAME: process.env.DBNAME,
    DBPORT: process.env.DBPORT,
    HashPassword: process.env.HashPassword
}