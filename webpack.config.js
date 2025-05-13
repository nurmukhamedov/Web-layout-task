const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',  
  output: {
    filename: 'js/bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    clean: true  
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  
          'css-loader',                
          'sass-loader'               
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',  
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
    })
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true
  },
  mode: 'development' 
};
