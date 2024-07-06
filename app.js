//solicito usar el modulo express instalado de npm
const express = require('express');

//solicito el modulo path de nodejs para manejar las rutas
const path = require('node:path');

//solicito el modulo de rutas
const { router } = require(path.join(__dirname, 'rutas', 'routes.js'));


//cargo datos de config.js
const config = require(path.join(__dirname, 'config', 'config.js'))
const PORT = config.PORT;

//conexion a la base(innecesaria en este lugar)
const database = require(path.join(__dirname, 'database', 'database.js'));
database.connection;



//inicializo express
const app = express();


//configurar middleware carpetas de archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

//middleware para manejar json entrantes
app.use(express.json());

//peticiones manejadas por router
app.use('/', router);


//server
app.set('port', PORT);
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto ' + PORT);
});
