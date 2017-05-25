const webpack = require('webpack');

const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv !== 'development';

const buildPath = path.join(__dirname, './build/');
const srcPath = path.join(__dirname, './src/');
const imgPath = path.join(__dirname, './src/assets/images/');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].js',
    minChunks(module) {
      const context = module.context;
      return context && context.indexOf('node_modules') >= 0;
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: srcPath,
    },
  }),
];

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'eslint-loader',
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
];

if (isProduction) {
  plugins.push(
   new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
       screw_ie8: true,
       conditionals: true,
       unused: true,
       comparisons: true,
       sequences: true,
       dead_code: true,
       evaluate: true,
       if_return: true,
       join_vars: true,
     },
     output: {
       comments: false,
     },
   }),
   new ExtractTextPlugin('style-[hash].css')
 );

 rules.push(
   {
    test: /\.css$/,
    loaders: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
    ]
  }
 );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  rules.push(
    {
      test: /\.css$/,
      loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    }
  );
}

module.exports = {
  entry: {
    js: 'index.js',
  },
  context: srcPath,
  plugins,
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcPath,
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name]-[hash].js',
  },
  devtool: isProduction ? false : 'source-map',
  devServer: {
    contentBase: isProduction ? buildPath : srcPath,
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
}
