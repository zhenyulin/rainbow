const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  target: 'node',
  entry: [
    'webpack/hot/poll?1000',
    './server/index',
  ],
  output: {
    path: path.resolve('.build'),
    filename: 'server.js',
  },
  resolve: {
    modules: [
      path.resolve('.'),
      'node_modules',
    ],
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000'],
  })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf|otf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]_[hash:base64:5].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  stats: {
    modules: false,
    hash: false,
    version: false,
    colors: true,
    assets: false,
  },
};
