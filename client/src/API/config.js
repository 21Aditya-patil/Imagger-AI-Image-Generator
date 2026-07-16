const DEFAULT_API_URL = "http://localhost:8000";

const stripTrailingSlashes = (url) => url.replace(/\/+$/, "");

export const API_BASE_URL = stripTrailingSlashes(
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/api$/, "");

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export const readErrorMessage = async (response, fallback) => {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const error = await response.json();
      return error.message || fallback;
    }

    const text = await response.text();
    return text || fallback;
  } catch {
    return fallback;
  }
};
