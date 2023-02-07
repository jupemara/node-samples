import type {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework';

export const streamingUpload: HttpFunction = (req: Request, res: Response) => {
  // if (req.method !== 'POST') {
  //   res.statusCode = 405;
  //   return;
  // }
  res.send('please post image');
};
