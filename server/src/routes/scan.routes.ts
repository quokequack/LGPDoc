import { Router } from 'express';
import { createScan, getScan, listScans } from '../controllers/scan.controller.js';

const router = Router();

router.post('/', createScan);
router.get('/', listScans);
router.get('/:id', getScan);

export default router;
