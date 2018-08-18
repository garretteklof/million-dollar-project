const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./src/app.js"],
  output: {
    path: path.join(__dirname, "public", "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { loader: "babel-loader", test: /\.js$/, exclude: /node_modules/ },
      { loader: "svg-url-loader", test: /\.svg/ }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    publicPath: "/dist/",
    proxy: [
      {
        context: ["/users", "/users/me", "/login", "/logout", "/location"],
        target: "http://localhost:3000"
      }
    ]
  }
};
