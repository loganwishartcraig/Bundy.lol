var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: './public/js',
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