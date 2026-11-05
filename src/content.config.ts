import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(["guias", "operaciones"]),
    draft: z.boolean().optional(),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
});

export const collections = { blog };
