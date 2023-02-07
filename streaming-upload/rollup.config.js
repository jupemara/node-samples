import typesctipt from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['@google-cloud/functions-framework'],
  plugins: [typesctipt()],
};
