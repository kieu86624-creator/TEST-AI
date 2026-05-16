import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';
export async function requestConnection(req: Request, res: Response) { const { receiverId } = z.object({ receiverId:z.string() }).parse(req.body); const connection = await prisma.connection.upsert({ where:{ requesterId_receiverId:{ requesterId:req.user.id, receiverId }}, update:{ status:'PENDING' }, create:{ requesterId:req.user.id, receiverId }}); res.status(201).json(connection); }
export async function acceptConnection(req: Request, res: Response) { const connection = await prisma.connection.update({ where:{ id:req.params.id }, data:{ status:'ACCEPTED' }}); res.json(connection); }
export async function myConnections(req: Request, res: Response) { const connections = await prisma.connection.findMany({ where:{ OR:[{ requesterId:req.user.id },{ receiverId:req.user.id }]}, include:{ requester:{ select:{ id:true,name:true,avatar:true,companyName:true }}, receiver:{ select:{ id:true,name:true,avatar:true,companyName:true }}}}); res.json(connections); }
