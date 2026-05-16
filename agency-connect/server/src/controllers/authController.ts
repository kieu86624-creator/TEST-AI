import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';
import { JWT_COOKIE, publicUser, signToken } from '../utils/auth.js';
import { ApiError } from '../utils/errors.js';
const registerSchema = z.object({ name:z.string().min(2), email:z.string().email(), password:z.string().min(6), role:z.enum(['AGENCY','BRAND','FREELANCER','CONSULTANT']), companyName:z.string().optional(), website:z.string().optional(), industry:z.string().optional(), teamSize:z.string().optional() });
const loginSchema = z.object({ email:z.string().email(), password:z.string().min(1) });
const cookieOptions = { httpOnly:true, sameSite:'lax' as const, secure:false, maxAge:7*24*60*60*1000 };
export async function register(req: Request, res: Response) { const data = registerSchema.parse(req.body); const exists = await prisma.user.findUnique({ where:{ email:data.email }}); if (exists) throw new ApiError(409,'Email đã được sử dụng.'); const passwordHash = await bcrypt.hash(data.password, 10); const user = await prisma.user.create({ data:{ name:data.name, email:data.email, passwordHash, role:data.role, companyName:data.companyName, website:data.website, bio:data.industry ? `Hoạt động trong lĩnh vực ${data.industry}` : undefined, agencyProfile: data.role==='AGENCY' ? { create:{ services:'Branding, Performance Marketing, SEO', industries:data.industry || 'Marketing', minBudget:3000, teamSize:data.teamSize || '2-10', rating:4.8, portfolio:'Website launch, Growth campaign' }} : undefined }}); const token = signToken(user.id); res.cookie(JWT_COOKIE, token, cookieOptions).status(201).json({ user: publicUser(user), token }); }
export async function login(req: Request, res: Response) { const data = loginSchema.parse(req.body); const user = await prisma.user.findUnique({ where:{ email:data.email }}); if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new ApiError(401,'Email hoặc mật khẩu không đúng.'); const token = signToken(user.id); res.cookie(JWT_COOKIE, token, cookieOptions).json({ user: publicUser(user), token }); }
export async function me(req: Request, res: Response) { res.json({ user: req.user }); }
