import { streamingUpload } from './streaming-upload';

(async () => {
  const file = process.argv[2];
  if (!file) {
    throw new Error('file not specified');
  }
  await streamingUpload(file);
})();
