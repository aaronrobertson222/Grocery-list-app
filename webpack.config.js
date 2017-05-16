var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production' || false;
var isDevelopment = process.env.NODE_ENV === 'development' || false;
var isTesting = process.env.NODE_ENV === 'testing' || false;

var imgPath = path.join(__dirname, './src/assets/images')

var app = [
  './src/index.jsx',
  './src/index.html',
];

var vendor = [
  'react',
  'react-dom',
];

var plugins = [
    new webpack.DefinePlugin({
        'process.env':  {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
    }),
];

if (isProduction) {
  // production plugins
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        output: {
          comments: false,
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('styles.css')
  )
}

module.exports = {
  entry: './src/index.jsx',
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
      ],
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        include: imgPath,
        use: isTesting ? 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      }
    ],
  },
  output: {
    path: __dirname + '/public',
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    stats: {
      assets: true,
      cached: true,
      timings: true,
      warnings: true,
    },
  }
};
