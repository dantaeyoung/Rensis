// webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'app');
const distDir = path.resolve(__dirname, '..', 'dist');

module.exports = {

  entry: {
    'app': [
      srcDir + '/main.js'
    ]
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules']
  }

  
};
