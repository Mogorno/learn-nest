import { NextFunction, Request, Response } from 'express';

export const loggerFnMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.method);
  next();
};
