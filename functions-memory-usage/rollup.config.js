import typesctipt from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: [
    'fs',
    'stream/promises',
    '@google-cloud/functions-framework',
    '@google-cloud/storage',
  ],
  plugins: [typesctipt()],
};
