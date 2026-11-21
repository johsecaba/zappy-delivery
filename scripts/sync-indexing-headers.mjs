/**
 * Reescribe los X-Robots-Tag de vercel.json desde src/config/indexing.mjs.
 * Así el cambio de indexación es un solo array.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { noindexPaths } from "../src/config/indexing.mjs";

const file = new URL("../vercel.json", import.meta.url);
const vercel = JSON.parse(readFileSync(file, "utf8"));

const headers = (vercel.headers ?? []).filter(
  (entry) => !entry.headers?.some((header) => header.key === "X-Robots-Tag"),
);

for (const pathname of noindexPaths) {
  for (const source of [pathname, `${pathname}/`]) {
    headers.push({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    });
  }
}

vercel.headers = headers;
writeFileSync(file, `${JSON.stringify(vercel, null, 2)}\n`);
