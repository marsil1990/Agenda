const { override, addWebpackAlias, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    http: path.resolve(__dirname, 'node_modules/stream-http'),
  }),
  addWebpackResolve({
    fallback: {
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
    },
  })

);
