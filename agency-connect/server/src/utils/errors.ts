import type { ErrorRequestHandler } from 'express';
export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => { const status = err.status || 500; res.status(status).json({ error: { message: err.message || 'Internal server error', status } }); };
