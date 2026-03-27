export function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function resolveApiUrl(pathname: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
  return `${baseUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
