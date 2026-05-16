import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';
const userSelect = { id:true,name:true,avatar:true,companyName:true,role:true };
export async function conversations(req: Request, res: Response) { const messages = await prisma.message.findMany({ where:{ OR:[{ senderId:req.user.id },{ receiverId:req.user.id }]}, include:{ sender:{ select:userSelect }, receiver:{ select:userSelect }}, orderBy:{ createdAt:'desc' }}); const map = new Map(); messages.forEach(m => { const other = m.senderId === req.user.id ? m.receiver : m.sender; if (!map.has(other.id)) map.set(other.id, { user: other, lastMessage:m }); }); res.json([...map.values()]); }
export async function thread(req: Request, res: Response) { const otherId = req.params.userId; const messages = await prisma.message.findMany({ where:{ OR:[{ senderId:req.user.id, receiverId:otherId },{ senderId:otherId, receiverId:req.user.id }]}, orderBy:{ createdAt:'asc' }}); res.json(messages); }
export async function sendMessage(req: Request, res: Response) { const data = z.object({ receiverId:z.string(), content:z.string().min(1) }).parse(req.body); const message = await prisma.message.create({ data:{ senderId:req.user.id, ...data }}); res.status(201).json(message); }
