import express from 'express';
import staticRouter from '../controllers/static.controller.js';

export const _staticRouter = express.Router();

_staticRouter.get('/', staticRouter.returnIndex);