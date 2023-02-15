// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
  mode: 'development',

  entry: {
    app: './app.js'
  },

  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // Add the following options to generate a custom div with an ID
        templateParameters: {
          'customDivId': 'map'
        }
      })
  ]
};

// This line enables bundling against src in this repo rather than installed module
module.exports = env => (env ? require('./webpack.config.local')(CONFIG)(env) : CONFIG);