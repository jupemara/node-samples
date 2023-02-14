import * as functions from '@google-cloud/functions-framework';
import type { Request, Response } from '@google-cloud/functions-framework';
import { Storage } from '@google-cloud/storage';
import * as stream from 'stream';
import * as fs from 'fs';

const c = new Storage(),
  BUCKET_NAME = process.env.BUCKET_NAME || '',
  OBJECT_PATH = process.env.OBJECT_PATH || '';

functions.http('x', fn);

export async function fn(req: Request, res: Response): Promise<void> {
  console.log(`${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
  const f = await fs.promises.readFile('./gcp.png');
  try {
    await upload(BUCKET_NAME, OBJECT_PATH, f);
    console.log('FIN');
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
    return;
  }
}

async function upload(bucket: string, path: string, content: Buffer) {
  const suffix = new Date().getTime(),
    f = c.bucket(bucket).file(`${path}-${suffix}`);
  await stream.promises.pipeline(
    stream.Readable.from(content),
    f.createWriteStream({
      resumable: false,
    }),
  );
}
