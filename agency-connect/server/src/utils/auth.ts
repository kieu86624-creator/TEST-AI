import jwt from 'jsonwebtoken';
export const JWT_COOKIE = 'agencyconnect_token';
export function signToken(userId: string) { return jwt.sign({ userId }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' }); }
export function verifyToken(token: string) { return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { userId: string }; }
export const publicUser = ({ passwordHash, ...user }: any) => user;
