const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
plugins: [
  new InjectManifest({
    swSrc: './src/sw.js',
    swDest: 'service-worker.js',
    include: [/\.html$/, /\.js$/, /\.css$/],
  }),
  new WebpackPwaManifest({
    name: 'Text Editor',
    short_name: 'Text Edit',
    description: 'A Text Editor using a Progressive Web Application',
    theme_color: '#7eb4e2',
    background_color: '#7eb4e2',
    icons: [
      {
        src: path.resolve('.\src\images\logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
      },
    ],
  }),

],
// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],

            },
          },
        },    
      ],
    },
  };
};
