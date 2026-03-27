import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "links_page";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : undefined
};

export default nextConfig;
