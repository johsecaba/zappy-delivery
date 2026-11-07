import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { lastmodFor } from "./src/lib/sitemap-lastmod.mjs";

const site = "https://zappydelivery.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  integrations: [
    sitemap({
      customPages: [`${site}/llms.txt`, `${site}/llms-full.txt`],
      filter: (page) => !page.includes("/404") && !page.endsWith("/robots.txt"),
      serialize(item) {
        const lastmod = lastmodFor(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  compressHTML: true,
});
