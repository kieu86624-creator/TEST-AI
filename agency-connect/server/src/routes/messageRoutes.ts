import { Router } from 'express';import { conversations, sendMessage, thread } from '../controllers/messageController.js';import { requireAuth } from '../middleware/auth.js';
export const messageRoutes = Router(); messageRoutes.get('/conversations', requireAuth, conversations); messageRoutes.get('/:userId', requireAuth, thread); messageRoutes.post('/', requireAuth, sendMessage);
