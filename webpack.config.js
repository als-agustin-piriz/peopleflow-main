const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = (env = {}) => {
  const buildClient = !env.target || env.target === 'client';
  const buildServer = !env.target || env.target === 'server';

  const configs = [];
  if (buildClient) configs.push(clientConfig);
  if (buildServer) configs.push(serverConfig);
  return configs;
};

const clientConfig = {
  name: 'client',
  target: 'web',
  entry: './client/index.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'client',
      remotes: {
        mfeUno: 'mfeUno@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '18.2.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '18.2.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: path.resolve(__dirname, 'dist/client/index.html'),
    }),
  ],
};

const serverConfig = {
  name: 'server',
  target: 'node',
  entry: './server/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.bundle.js',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
    }),
    new webpack.DefinePlugin({
      'process.env.SECRET_SESSION': JSON.stringify(process.env.SECRET_SESSION),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  devtool: 'source-map',
};

module.exports = [clientConfig, serverConfig];
