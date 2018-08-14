const dotenv = require("dotenv").config();
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const envPlugin = new webpack.DefinePlugin({
  API_KEY: JSON.stringify(process.env.API_KEY)
});

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["react", "env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  performance: { hints: false },
  plugins: [htmlPlugin, envPlugin]
};
