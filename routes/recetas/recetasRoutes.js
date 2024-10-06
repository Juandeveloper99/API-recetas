import { Router } from 'express';
import verifyToken from '../middleware.js';
import {
    listarTodosrecetas,
    listarrecetaPorId,
    crearreceta,
    actualizarreceta,
    eliminarreceta
} from '../../controllers/recetas/recetasController.js';

const recetasRouter = Router();

recetasRouter.use(verifyToken);

recetasRouter.get('/', listarTodosrecetas);
recetasRouter.get('/:id', listarrecetaPorId);

recetasRouter.post('/', crearreceta);
recetasRouter.put('/:id', actualizarreceta);
recetasRouter.delete('/:id', eliminarreceta);

export default recetasRouter;
