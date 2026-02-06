const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /Module not found|Can't resolve/,
    },
  ],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/styles.css", to: "styles.css" },
      ],
    }),
  ],
  resolve: {
    fallback: {
      os: false,
      fs: false,
      path: false,
      crypto: false,
      url: false,
      http: false,
      https: false,
      util: false,
      vm: false,
      tty: false,
      buffer: false,
      stream: false,
      zlib: false,
      assert: false,
    },
    alias: {
      "node:path": false,
      "node:fs": false,
      "node:os": false,
      "node:crypto": false,
      "node:url": false,
      "node:http": false,
      "node:https": false,
      "node:util": false,
      "node:vm": false,
      "node:tty": false,
      "node:buffer": false,
      "node:stream": false,
      "node:zlib": false,
      "node:assert": false,
    },
  },
};
