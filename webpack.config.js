const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = () => {
  require(path.join(__dirname, "server", "config", "config"));
  return {
    mode: "development",
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        { loader: "babel-loader", test: /\.js$/, exclude: /node_modules/ },
        { loader: "svg-sprite-loader", test: /\.svg$/ }
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
    plugins: [
      new webpack.DefinePlugin({
        GOOGLE_MAPS_API_KEY: JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)
      })
    ],
    devtool:
      process.env.NODE_ENV === "production"
        ? "source-map"
        : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/",
      proxy: [
        {
          context: ["/users", "/login", "/logout", "/location"],
          target: "http://localhost:3000"
        },
        {
          context: ["/socket.io"],
          target: "http://localhost:3000",
          ws: true
        }
      ]
    }
  };
};
