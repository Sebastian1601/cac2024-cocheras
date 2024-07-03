//solicito usar el modulo express instalado de npm
const express = require('express');

//solicito el modulo path de nodejs para manejar las rutas
const path = require('node:path');

//solicito el modulo de rutas
const rutas = require('./rutas/routes.js');



//server
const app = express();
const PORT = 3000;
app.set('port', 3000);
app.listen(PORT, ()=>{
    console.log('servidor corriendo en el puerto ' + PORT);
});



//configurar middleware carpetas de archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

//middleware para manejar json entrantes
app.use(express.json());


//rutas
app.get('/index.html', rutas.enviarIndex);

app.get('/login.html', rutas.enviarLogin);

app.get('/mapa.html', rutas.enviarMapa);

app.get('/estacionamiento.html', rutas.enviarEstacionamiento);

app.get('/registro.html', rutas.enviarRegistro);

