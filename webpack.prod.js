const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const cssnano = require('cssnano');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const optimizeCSSPlugin = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: cssnano,
  cssProcessorPluginOptions: {
    preset: [
      'default',
    ]
  },
  canPrint: true,
});

const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
  }),
  optimizeCSSPlugin
];

// TODO: change it to only use minicss loader in prod, not dev
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
        chunks: 'all'
    },
    minimizer: [new TerserJSPlugin({}), optimizeCSSPlugin],
  },
  plugins: [
    ...common.plugins,
    ...prodPlugins
  ]
});