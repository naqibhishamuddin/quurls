/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mui/material", "@material-ui/icons"],
  },
};

export default nextConfig;
