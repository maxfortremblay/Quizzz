const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      // JavaScript/React
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      // Images/Media
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "media/[name][ext]"
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services")
    }
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  mode: process.env.NODE_ENV || "development"
};
