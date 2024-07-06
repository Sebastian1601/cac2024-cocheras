const express = require('express');
const router = express.Router();
const path = require('node:path');
const { crearUsuario } = require('../database/userController.js');

//creo la ruta base a public.
const rutaEstatica = path.join(__dirname, '..', 'public');



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

//peticiones get ruteadas a cada pagina
router.get('/index.html', enviarIndex);

router.get('/login.html', enviarLogin);

router.get('/mapa.html', enviarMapa);

router.get('/estacionamiento.html', enviarEstacionamiento);

router.get('/registro.html', enviarRegistro);


//peticiones post exclusivas de los formularios
router.post('/registerUser', crearUsuario);


module.exports = { router };
