import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma/client.js';
import { JWT_COOKIE, verifyToken, publicUser } from '../utils/auth.js';
import { ApiError } from '../utils/errors.js';

declare global { namespace Express { interface Request { user?: any } } }
export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization?.replace('Bearer ', '');
    const token = req.cookies?.[JWT_COOKIE] || header;
    if (!token) throw new ApiError(401, 'Bạn cần đăng nhập để tiếp tục.');
    const { userId } = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(401, 'Phiên đăng nhập không hợp lệ.');
    req.user = publicUser(user); next();
  } catch { next(new ApiError(401, 'Phiên đăng nhập hết hạn hoặc không hợp lệ.')); }
}
