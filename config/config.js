//configuracion de variables que no van a compartirse.

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1' ,
    PORT: process.env.PORT || 3000,
    DBHOST:process.env.DBHOST,
    DBUSER:process.env.DBUSER ,
    DBPASS: process.env.DBPASS,
    DBNAME: process.env.DBNAME,
    DBPORT: process.env.DBPORT,
    HashPassword:process.env.HashPassword
}