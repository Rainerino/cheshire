import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-import-css';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.tsx',
  treeshake: false,
  output: {
    dir: 'public',
    entryFileNames: 'bundle.js',
  },
  plugins: [
    css(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: false,
    }),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
