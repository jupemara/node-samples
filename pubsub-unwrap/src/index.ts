import { Request, Response } from 'express';

export const main = (req: Request, res: Response): void => {
  console.log('message:', req.body);
  res.status(200).send('ok');
};
