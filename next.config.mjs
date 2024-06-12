/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT: 'https://phoenix.liara.run',
        WEBSOCKET_ENDPOINT: 'wss://phoenix.liara.run/hub/update-device-notification',
        APP_MODE:"production"
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      output: 'standalone',
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
