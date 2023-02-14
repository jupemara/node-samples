import typesctipt from '@rollup/plugin-typescript';

export default {
  input: 'src/express.ts',
  output: {
    file: 'dist/express.js',
    format: 'cjs',
  },
  external: [
    'express',
    'fs',
    'stream',
    '@google-cloud/storage',
    '@google-cloud/functions-framework',
  ],
  plugins: [typesctipt()],
};
