import { Router } from 'express';import { getUser, searchUsers, updateMe } from '../controllers/userController.js';import { requireAuth } from '../middleware/auth.js';
export const userRoutes = Router(); userRoutes.get('/search', requireAuth, searchUsers); userRoutes.get('/:id', requireAuth, getUser); userRoutes.put('/me', requireAuth, updateMe);
