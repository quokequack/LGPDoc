import { Router } from 'express';
import { getGlossary } from '../controllers/glossary.controller.js';

const router = Router();

router.get('/', getGlossary);

export default router;
