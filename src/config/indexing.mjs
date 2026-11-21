/**
 * Única lista de rutas noindex.
 * Vacía: las tres landings de servicios son indexables (meta robots,
 * X-Robots-Tag, sitemap, llms.txt y el catálogo schema).
 * Para volver a ocultar una, agregue su ruta y vuelva a construir.
 */
export const noindexPaths = [];

export function isNoindexPath(pathname) {
  const normalized = String(pathname || "/").replace(/\/$/, "") || "/";
  return noindexPaths.includes(normalized);
}
