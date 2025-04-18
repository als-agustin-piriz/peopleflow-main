const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const alias = require('./alias.config');
require('dotenv').config();

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
    entry: './client/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        alias,
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
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
                react: {singleton: true, eager: true, requiredVersion: '18.2.0'},
                'react-dom': {singleton: true, eager: true, requiredVersion: '18.2.0'},
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
        alias,
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
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
