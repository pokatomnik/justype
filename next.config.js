const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports =
  process.env === 'PRODUCTION'
    ? withPWA({
        pwa: {
          dest: 'public',
          runtimeCaching,
        },
      })
    : {};
