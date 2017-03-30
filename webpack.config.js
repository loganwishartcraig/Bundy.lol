var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: path.resolve(__dirname, './public/src/entry.js'),
  watch: true,
  output: {
    path: path.resolve(__dirname, './public/dist/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  },
  plugins: [
    new LiveReloadPlugin({
      hostname: 'localhost', 
      port: 35729, 
      appendScriptTag: true
    })
  ]
};