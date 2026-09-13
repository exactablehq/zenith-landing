export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const basePath =
    rawBasePath === "/"
      ? ""
      : rawBasePath.endsWith("/")
      ? rawBasePath.slice(0, -1)
      : rawBasePath;

  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  const cleanPath = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${cleanPath}`;
}
