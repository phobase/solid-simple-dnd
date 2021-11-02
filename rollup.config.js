import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      dir: 'dist',
      format: 'es',
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      extensions: ['.tsx', '.ts'],
      presets: ['solid', '@babel/typescript'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    typescript(),
  ],
  external: ['solid-js', 'solid-js/store', 'solid-js/web', 'loglevel', 'classcat'],
};
