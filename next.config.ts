import type { NextConfig } from "next";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath =
  rawBasePath === "/"
    ? ""
    : rawBasePath.endsWith("/")
    ? rawBasePath.slice(0, -1)
    : rawBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.ts",
  },
};

export default nextConfig;
