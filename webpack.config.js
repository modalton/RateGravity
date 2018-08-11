const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "./src/client/");

console.log(APP_DIR);

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
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
      }
    ]
  },
  plugins: [htmlPlugin]
};
