/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "recharts",
    "react-smooth",
    "react-transition-group",
    "@babel/runtime",
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules\/@babel\/runtime/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};

export default nextConfig;
