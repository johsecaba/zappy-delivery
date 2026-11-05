import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function isPublished(post: BlogPost, now = Date.now()): boolean {
  if (post.data.draft === true) return false;
  return post.data.pubDate.getTime() <= now;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog");
  return posts
    .filter((post) => isPublished(post))
    .sort(
      (a, b) =>
        b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id),
    );
}
