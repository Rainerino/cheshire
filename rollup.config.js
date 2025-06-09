import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-import-css';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default {
  input: 'src/main.tsx',
  treeshake: false,
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    css(),
    json(),
    peerDepsExternal(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: false,
    }),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
