import { defineCollection, z } from "astro:content";

const blogsCollection = defineCollection({
  schema: z.object({
    date: z.string(),
    image: z.string(),
    title: z.string(),
    categories: z.array(z.string()),
  }),
});

export const collections = {
  blogs: blogsCollection,
};
