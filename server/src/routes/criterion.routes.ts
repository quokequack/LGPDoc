import { Router } from 'express';
import { getCriteria } from '../controllers/criterion.controller.js';

const router = Router();

router.get('/', getCriteria);

export default router;
