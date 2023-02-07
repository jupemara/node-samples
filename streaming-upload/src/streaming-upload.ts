import * as fs from 'fs';
import { finished } from 'stream/promises';
import { Storage } from '@google-cloud/storage';

const client = new Storage(),
  bucket = process.env.BUCKET_NAME || '';

export async function streamingUpload(file: string): Promise<void> {
  const o = client.bucket(bucket).file('u/' + file),
    s = fs.createReadStream(file),
    d = o.createWriteStream({
      gzip: true,
    });
  o.metadata = {
    'awesome-key': 'awesome-value',
    env: 'sample',
  };
  try {
    s.pipe(d);
    await finished(s);
    return;
  } catch (e) {
    d.end();
    throw e;
  }
}
