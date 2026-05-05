const PUBLIC_URL_BASE = "https://deprived.dev/";

// Absolute vibe coded. Idk if it works or not. Not important anyways
// Assumes PUBLIC_URL_BASE is something like "https://deprived.dev"
const ABSOLUTE_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//;

function withTrailingSlash(s: string): string {
  return s.replace(/\/+$/, "") + "/";
}

export function ParseAssetUrl(url: string, base?: string): string {
  // Handle empty/undefined url: if a base is given, return the base itself
  if (!url) {
    const origin =
      (typeof PUBLIC_URL_BASE !== "undefined" && PUBLIC_URL_BASE) || "";
    if (!base) return ""; // no filename, no base → nothing to resolve

    try {
      // Make base absolute
      const absoluteBase = ABSOLUTE_RE.test(base)
        ? withTrailingSlash(base)
        : new URL(withTrailingSlash(base), withTrailingSlash(origin)).href;

      return absoluteBase; // e.g. "https://deprived.dev/assets/shop/preview-images/"
    } catch {
      return "";
    }
  }

  // Already absolute
  if (ABSOLUTE_RE.test(url)) {
    try {
      return new URL(url).href;
    } catch {
      return url;
    }
  }

  const origin =
    (typeof PUBLIC_URL_BASE !== "undefined" && PUBLIC_URL_BASE) || "";
  let absoluteBase = "";

  try {
    if (base) {
      absoluteBase = ABSOLUTE_RE.test(base)
        ? withTrailingSlash(base)
        : new URL(withTrailingSlash(base), withTrailingSlash(origin)).href;
    } else {
      if (!origin) return url;
      absoluteBase = withTrailingSlash(origin);
    }

    return new URL(url, absoluteBase).href;
  } catch {
    return url;
  }
}
