const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);

const ENV_PRODUCTION = 'production';

module.exports =
  process.env.NODE_ENV === ENV_PRODUCTION
    ? withPWA({
        pwa: {
          dest: 'public',
          runtimeCaching,
        },
      })
    : {};
