import express from 'express';
import userRoutes from '../controllers/user.controllers.js';
import crypto from 'node:crypto';


export const _userRouter = express.Router();

_userRouter.get('/login', (req, res) => {
    //loguear al usuario
    res.status(200).json({ message: 'User is logged in' });
});

_userRouter.post('/register', (req, res) => {
    //obtener los datos enviados por el form...
    const { nombre, apellido, dni, localidad, email } = req.body;
    const NewUser = {
        nombre,
        apellido,
        dni,
        localidad,
        email,
        id: crypto.randomUUID()
    }
    res.status(200).json(NewUser);
});

