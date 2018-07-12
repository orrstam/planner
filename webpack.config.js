
const fs = require('fs');
const path = require('path');
const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server/server.ts',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
        {
            use: 'ts-loader',
            test: /\.tsx?$/
        }
    ]
},
  target: 'node',
  externals: nodeModules,
};