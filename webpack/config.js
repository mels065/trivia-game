// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "../dist")
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
          new TsConfigPathsPlugin()
        ]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html')
      })
    ]
};
