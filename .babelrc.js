const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs';
const loose = true;

module.exports = {
  presets: [
    ['@babel/env', { loose, modules: false }]
  ],
  plugins: [
    ['@babel/proposal-object-rest-spread', { loose }],
    '@babel/transform-react-jsx',
    '@babel/plugin-transform-object-assign',
    cjs && ['@babel/transform-modules-commonjs', { loose }],
  ].filter(Boolean)
};
