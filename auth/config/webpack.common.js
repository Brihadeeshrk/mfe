/**
 * This module export is typically used in a webpack configuration file (often named webpack.config.js) to define how webpack should handle different types of files during the bundling process.
 * In this specific configuration:
 *
 * The test property uses a regular expression to match files with .js or .mjs extensions, indicating that the rule applies to JavaScript files.
 * The exclude property specifies that files in the node_modules directory should be excluded from the rule, as they typically don't need to be processed by webpack.
 * The use property specifies the loader (babel-loader) to be used for files that match the test, along with the loader options.
 * In this case, Babel is configured with presets for React (@babel/preset-react) and modern JavaScript (@babel/preset-env),
 * as well as a plugin for transforming runtime functions (@babel/plugin-transform-runtime).
 * This configuration enables webpack to process JavaScript files using Babel, allowing for the use of modern JavaScript syntax and JSX in the source code.
 */
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
