var path = require('path');

module.exports = {
  extensions: ['.jsx','.js','.json'],
  alias:{
    '@': path.join(__dirname, 'docs')
  }
};
