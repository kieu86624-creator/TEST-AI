import { Router } from 'express';import { getPartner, getPartners } from '../controllers/partnerController.js';import { requireAuth } from '../middleware/auth.js';
export const partnerRoutes = Router(); partnerRoutes.get('/', requireAuth, getPartners); partnerRoutes.get('/:id', requireAuth, getPartner);
