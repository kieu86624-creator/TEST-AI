import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';
const select = { id:true,name:true,email:true,role:true,avatar:true,coverImage:true,bio:true,companyName:true,website:true,location:true,createdAt:true, agencyProfile:true };
export async function getUser(req: Request, res: Response) { const user = await prisma.user.findUnique({ where:{ id:req.params.id }, select }); res.json(user); }
export async function updateMe(req: Request, res: Response) { const data = z.object({ name:z.string().min(2).optional(), bio:z.string().optional(), companyName:z.string().optional(), website:z.string().optional(), location:z.string().optional() }).parse(req.body); const user = await prisma.user.update({ where:{ id:req.user.id }, data, select }); res.json(user); }
export async function searchUsers(req: Request, res: Response) { const q = String(req.query.q || ''); const users = await prisma.user.findMany({ where:{ OR:[{ name:{ contains:q }},{ companyName:{ contains:q }},{ location:{ contains:q }}]}, select, take:20 }); res.json(users); }
