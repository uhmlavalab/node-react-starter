const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  node: {
    __dirname: false,   
    __filename: false,
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({/* options: see below */})]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  mode: "production",
  externals: ['bufferutil', 'utf-8-validate'],
  optimization: {
    minimize: false,
  },
  devtool: 'source-map'
};
