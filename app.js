require('dotenv').config();

//solicito usar el modulo express instalado de npm
const express = require('express');

//solicito el modulo path de nodejs para manejar las rutas
const path = require('node:path');

//solicito el modulo de rutas
const { router } = require(path.join(__dirname, 'rutas', 'routes.js'));


//cargo datos de config.js
const config = require(path.join(__dirname, 'config', 'config.js'))
const PORT = config.PORT;
const HOST = config.HOST;


//inicializo express
const app = express();


//configurar middleware carpetas de archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

//evitar los errores cors(SOLO PARA DEPURAR)
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); */

//middleware para manejar json entrantes
app.use(express.json());

//peticiones manejadas por router
app.use('/', router);


//server
app.set('port', PORT);
app.listen(PORT, ()=>{
    console.log('servidor corriendo en: ', `http://${HOST}:${PORT}`);
}); 
