import { TareaController } from './../controller/TareaController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', TareaController.getAll);

// Get one user
router.get('/:id', TareaController.getById);

// Get one user
router.get('/tareasUsuario/:propietario_tarea', TareaController.getByPropietario);

// Create a new user
router.post('/', TareaController.new);

// Edit user
router.patch('/:id', TareaController.edit);

// Delete
router.delete('/:id', TareaController.delete);

export default router;
