import { Request, Response } from 'express';

export const main = (req: Request, res: Response): void => {
  console.log('body:', req.body);
  console.log('headers:', req.headers);
  res.status(200).send('ok');
};
