const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: { sourceMap: true },
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true },
              },
            ],
          }),
          // use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map', //cheap-module-eval-source-map
    devServer: {
      // hot: true,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
    plugins: [
      // Enable the plugin
      CSSExtract,
      // new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

/* module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // hot: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    // quiet: true,
  },
  // plugins: [
  //   // Enable the plugin
  //   new webpack.HotModuleReplacementPlugin(),
  // ],
}; */
