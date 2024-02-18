/**
 * This module export is used to merge two webpack configuration objects and create a single configuration that combines the settings from both.
 * Here's a breakdown of the code:
 *
 * It begins by importing the merge function from the "webpack-merge" package, which is used to merge webpack configuration objects.
 * It also imports the htmlWebpackPlugin from the "html-webpack-plugin" package, which is a plugin that simplifies the creation of HTML files to serve webpack bundles.
 * It then imports a common webpack configuration from a file named "webpack.common".
 * After that, it defines a new configuration object devConfig for the development environment.
 * It sets the mode to "development" and configures the devServer to run on port 8081 with a historyApiFallback setting to serve "index.html" for any 404 responses.
 * It also includes a plugin htmlWebpackPlugin that generates an HTML file based on a template located at "./public/index.html".
 * Finally, it exports the merged configuration of commonConfig and devConfig using the merge function.
 * This export allows the webpack configurations for the common settings and the development environment to be combined into a single configuration object, ensuring that both sets of configurations are applied when webpack runs in development mode.
 */

const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
