import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/http.exception';

const httpErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  if (message === 'invalid token' || message === 'jwt malformed') {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
  return res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
