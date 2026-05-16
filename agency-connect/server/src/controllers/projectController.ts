import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';
const include = { owner:{ select:{ id:true,name:true,companyName:true,avatar:true,role:true }}};
export async function getProjects(_req: Request, res: Response) { const projects = await prisma.project.findMany({ orderBy:{ deadline:'asc' }, include }); res.json(projects); }
export async function createProject(req: Request, res: Response) { const data = z.object({ title:z.string().min(3), description:z.string().min(10), budget:z.string(), deadline:z.string(), skills:z.array(z.string()).default([]) }).parse(req.body); const project = await prisma.project.create({ data:{ ...data, deadline:new Date(data.deadline), skills:data.skills.join(','), ownerId:req.user.id }, include }); res.status(201).json(project); }
export async function getProject(req: Request, res: Response) { const project = await prisma.project.findUnique({ where:{ id:req.params.id }, include }); res.json(project); }
export async function applyProject(req: Request, res: Response) { res.json({ ok:true, message:'Hồ sơ ứng tuyển đã được ghi nhận cho demo MVP.' }); }
