export const CONTENT_TYPE = {
  JSON: "application/json",
  HTML: "text/html",
  TEXT: "text/plain",
} as const;

// Optional: create a type of the values (not keys)
export type ContentType = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE];
