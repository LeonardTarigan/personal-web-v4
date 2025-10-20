import { defineCollection, z } from "astro:content";

const blogsCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    image: z.string(),
    title: z.string(),
    categories: z.array(z.string()),
  }),
});

export const collections = {
  blogs: blogsCollection,
};
