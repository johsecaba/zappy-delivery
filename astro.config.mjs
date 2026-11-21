import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { lastmodFor } from "./src/lib/sitemap-lastmod.mjs";
import { isNoindexPath } from "./src/config/indexing.mjs";

const site = "https://zappydelivery.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  integrations: [
    sitemap({
      customPages: [`${site}/llms.txt`, `${site}/llms-full.txt`],
      filter: (page) => {
        const path = new URL(page).pathname;
        return !page.includes("/404") && !page.endsWith("/robots.txt") && !isNoindexPath(path);
      },
      serialize(item) {
        const lastmod = lastmodFor(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  compressHTML: true,
});
