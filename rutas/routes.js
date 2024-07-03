const express = require('express');

const router = express.Router();

const path = require('node:path');

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



module.exports = {
    enviarIndex,
    enviarLogin,
    enviarMapa,
    enviarEstacionamiento,
    enviarRegistro
};