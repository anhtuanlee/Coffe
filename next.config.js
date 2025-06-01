const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const needPrefix =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'develop';

/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        port: '',
      },
    ],
  },
  sassOptions: {
    additionalData: `
          @import "@Styles/_tool.scss";
      `,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              'prefixIds',
            ],
          },
        },
      },
    });
    return config;
  },
};
module.exports = nextConfig;
// module.exports = (phase) => {
//   if (isProd && (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD)) {
//     const withPWA = require('@ducanh2912/next-pwa').default({
//       dest: 'public',
//       workboxOptions: {
//         disableDevLogs: true,
//       },
//       pwa: {
//         dest: 'public',
//         mode: 'production',
//       },
//     });
//     return withPWA(nextConfig);
//   }
//   return nextConfig;
// };
