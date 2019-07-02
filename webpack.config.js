/* eslint no-var:0 */
var webpack = require('webpack');
var yargs = require('yargs');
var path = require('path')
const basePath = path.dirname(__filename)

var options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

var config = {
  entry: `${basePath}/src/index.js`,
  output: {
    path: `${basePath}/dist`,
    filename: options.optimizeMinimize ? 'vizceral_eva.min.js' : 'vizceral_eva.js',
    library: 'Vizceral',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      { test: /\.glsl$/, loader: 'raw-loader' },
      { test: /\.woff2?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.otf$/, loader: 'file' },
      { test: /\.ttf$/, loader: 'file' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: process.env.NODE_ENV !== 'production',
      __HIDE_DATA__: !!process.env.HIDE_DATA,
      'process.env.ASSET_PATH': basePath
    }),  
  ]
};

if (!options.optimizeMinimize) {
  config.devtool = 'source-map';
}

module.exports = config;
