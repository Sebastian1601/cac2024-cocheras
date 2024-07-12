//app.js utiliza las rutas de este archivo, en app.use, y a su vez, este archivo usa los modulos de control para la coneioxn con la base de datos de ../database/userController.js

const express = require('express');
const router = express.Router();
const path = require('node:path');
const { crearUsuario, consultaUsuarios, loginUsuario, consultaUser , editarUsuario} = require('../database/userController.js');


//creo la ruta base a public.
const rutaEstatica = path.join(__dirname, '..', 'public');


//se crean las respuestas basicas a cada página htmls
const enviarIndex = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'index.html'))
};

const enviarLogin = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'login.html'))
};

const enviarMapa = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'mapa.html'))
};

const enviarEstacionamiento = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'estacionamiento.html'))
};

const enviarRegistro = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'registro.html'))
};

const enviarAdminPanel = (req, res) => {
    res.sendFile(path.join(rutaEstatica, 'adminPanel.html'))
};


//las peticiones get se rutean a cada pagina
router.get('/', enviarIndex);

router.get('/login.html', enviarLogin);

router.get('/mapa.html', enviarMapa);

router.get('/estacionamiento.html', enviarEstacionamiento);

router.get('/registro.html', enviarRegistro);




//ruta para el panel de administrador
router.get('/adminPanel.html', enviarAdminPanel);

//peticiones post exclusivas de los formularios
//guardar usuario mediante userController.js/crearUsuario()
router.post('/api/nuevoUsuario', crearUsuario);

//solicitar lista de usuarios mediante userController.js/consultaUsuarios()
router.get('/api/consultarUsuarios', consultaUsuarios);

//ruta para el login
router.post('/api/login', loginUsuario);

//ruta para consultar un unico usuario
router.get('/api/consultarUser/:dni', consultaUser);

//ruta para modificar usuario
router.put('/api/editarUsuario/:dni', editarUsuario)

module.exports = { router };
