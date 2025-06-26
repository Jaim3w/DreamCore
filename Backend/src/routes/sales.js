import { Router } from 'express';
import salesController from '../controllers/salesController.js';

const router = Router();

// Rutas existentes
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.createSales);
router.put('/:id', salesController.updateSales);
router.delete('/:id', salesController.deleteSales);

// **Nuevo endpoint** para el historial de un cliente
router.get('/client/:clientId', salesController.getSalesByClient);

export default router;
