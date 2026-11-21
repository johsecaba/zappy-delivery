declare module "*config/indexing.mjs" {
  export const noindexPaths: readonly string[];
  export function isNoindexPath(pathname: string): boolean;
}
