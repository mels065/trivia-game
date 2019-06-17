const config = require('./config');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.output.filename = 'bundle.[hash].js';
config.module.rules.push(
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: true,
          reloadAll: true
        }
      },
      'css-loader',
      'sass-loader'
    ]
  }
);
config.plugins.push(new MiniCssExtractPlugin({
  filename: 'style.[hash].css'
}));

module.exports = {
  ...config,
  mode: 'production',
  optimization: {
    minimizer: [new TerserWebpackPlugin()]
  }
};
