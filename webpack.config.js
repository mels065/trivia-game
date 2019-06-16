// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

function setDevTool() {
  const ENV = process.env.NODE_ENV;
  if (ENV === 'testing') return 'inline-source-map';
  if (ENV === 'production') return 'source-map';
  return 'eval-source-map';
}

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devtool: setDevTool(),

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: true } }] },
            {
              test: /\.scss$/,
              use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
              ]
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFileName: '[id].css'
      })
    ],
    devServer: {
      contentBase: path.join(__dirname),
      historyApiFallback: true,
      port: 5000,
      proxy: {
        context: ['/api', '/socket'],
        target: 'http://localhost:3000'
      }
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
