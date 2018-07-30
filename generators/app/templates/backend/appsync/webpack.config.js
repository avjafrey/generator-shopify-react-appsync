const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,

  output: {
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

  mode: "production",

  devtool: "source-map",

  plugins: [
  ],

  target: "node",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      { test: /\.graphql$/, loader: "raw-loader", enforce: "pre", exclude: /node_modules/ },
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre", exclude: /node_modules/ },
      { test: /\.tsx$/, loader: "source-map-loader", enforce: "pre", exclude: /node_modules/ },
      { test: /\.tsx?$/, loader: ["ts-loader"] }
    ]
  },

  externals: [
    nodeExternals()
  ],
};
