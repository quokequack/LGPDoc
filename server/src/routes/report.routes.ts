import { Router } from 'express';
import { getScanReport } from '../controllers/report.controller.js';

const router = Router();

router.get('/:id/report', getScanReport);

export default router;
