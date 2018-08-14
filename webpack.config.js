const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
      { loader: "svg-url-loader", test: /\.svg/ },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [require("autoprefixer")()],
              sourceMap: true
            }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    publicPath: "/dist/",
    proxy: [
      {
        context: [
          "/users",
          "/users/me",
          "/login",
          "/logout",
          "/current-location"
        ],
        target: "http://localhost:3000"
      }
    ]
  }
};
