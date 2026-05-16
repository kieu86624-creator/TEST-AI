import type { Request, Response } from 'express';
import { prisma } from '../prisma/client.js';
const select = { id:true,name:true,email:true,role:true,avatar:true,bio:true,companyName:true,website:true,location:true,agencyProfile:true };
export async function getPartners(req: Request, res: Response) { const q = String(req.query.q || ''); const partners = await prisma.user.findMany({ where:{ role:'AGENCY', OR:[{ name:{ contains:q }},{ companyName:{ contains:q }},{ location:{ contains:q }},{ agencyProfile:{ industries:{ contains:q }}}]}, select }); res.json(partners); }
export async function getPartner(req: Request, res: Response) { const partner = await prisma.user.findFirst({ where:{ id:req.params.id, role:'AGENCY' }, select }); res.json(partner); }
