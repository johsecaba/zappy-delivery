import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://zappydelivery.com",
  output: "static",
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  compressHTML: true,
});
