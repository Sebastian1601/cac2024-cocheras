import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { _staticRouter } from './routes/static.routes.js';
import { _userRouter } from './routes/user.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const app = express();

const PORT = process.env.PORT ?? 3005;

// <!--middlewares--->
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// <!--config--->


// <!--routes--->
app.use('/', _staticRouter);
app.use('/user', _userRouter)

// <!--middlewares--->



app.listen(PORT, () => {
    console.log(`Server upt and running on port:${PORT}`);
});

