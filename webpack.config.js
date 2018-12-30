var path = require('path');
var srcDir = path.resolve(__dirname, 'src');
var buildDir = path.resolve(__dirname, 'build');

var webpack = require('webpack');
var BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
var UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(srcDir, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  var rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.s[ca]ss$/,
      exclude: /node_modules/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ],
    },
    {
      test: /.(svg|png|jp[e]?g)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }
  ];

  var output = {
    filename: 'app.js',
    path: buildDir
  };

  var resolve = {
    alias: {
      '@actions': path.resolve(__dirname, 'src/actions'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@reducers': path.resolve(__dirname, 'src/reducers'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@sagas': path.resolve(__dirname, 'src/sagas'),
      '@selectors': path.resolve(__dirname, 'src/selectors'),
      '@store': path.resolve(__dirname, 'src/store.js')
    }
  };

  if (!env || !env.mode)
    env = {mode: 'development'};

  if (env.mode === 'production') {
    return {
      entry: path.resolve(srcDir, 'index.js'),
      module: { rules },
      output,
      resolve,
      mode: 'production',
      devtool: 'eval',
      devServer: {
        contentBase: buildDir,
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
          "/api": "http://localhost:3000",
          "/public": "http://localhost:3000"
        }
      },
      plugins: [
        HTMLWebpackPluginConfig,
        new CleanWebpackPlugin(['build']),
        new UglifyJSWebpackPlugin(),
        new BabelMinifyWebpackPlugin(),
        new Dotenv()
      ]
    };
  } else {
    
    return {
      entry: path.resolve(srcDir, 'index.js'),
      module: { rules },
      output,
      resolve,
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: buildDir,
        historyApiFallback: true,
        hot: true,
        disableHostCheck: true,
        proxy: {
          "/api": "http://localhost:3000",
          "/public": "http://localhost:3000"
        }
      },
      plugins: [
        HTMLWebpackPluginConfig,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
      ]
    };
  }
};
