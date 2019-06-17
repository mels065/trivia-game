const config = require('./config');
const { HotModuleReplacementPlugin } = require('webpack');
const path = require('path');

config.output.filename = 'bundle.js';
config.module.rules.push(
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
);
config.plugins.push(new HotModuleReplacementPlugin());

module.exports = {
  ...config,
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    historyApiFallback: true,
    hot: true,
    port: 5000,
    proxy: {
      context: ['/api', '/socket'],
      target: 'http://localhost:3000'
    },
    progress: true,
    open: true
  },
  devtool: 'cheap-module-eval-source-map'
}
