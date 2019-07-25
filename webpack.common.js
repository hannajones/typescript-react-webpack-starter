const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const loaders = [
  {
    test: /\.(tsx?)|(jsx?)$/,
    exclude: [
      /node_modules/
    ],
    loader: 'ts-loader'
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: { minimize: true }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')(),
          ]
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader'
  },
  {
    test: /\.svg$/,
    use: [
      {
          loader: 'url-loader?limit=1&mimetype=image/svg+xml'
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {removeTitle: true},
            {convertColors: {shorthex: false}},
            {convertPathData: false}
          ]
        }
      }
    ]
  }
];

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    inject: 'body'
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(dotenv.parsed)
  })
];

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.html', '.svg']
  },
  module: {
    rules: loaders
  },
  plugins
};