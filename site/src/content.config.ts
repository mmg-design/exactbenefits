import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/* Local stand-ins until Sanity is connected (04-content/sanity-schema-plan.md). */

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      metaTitle: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.string(),
      intro: z.string().optional(),
      issue: z.string().optional(),
      mainImage: image(),
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/guides" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      fullTitle: z.string(),
      description: z.string(),
      tag: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

const education = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/education" }),
  schema: z.object({
    title: z.string(),
    fullTitle: z.string(),
    description: z.string(),
    short: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    videoUrl: z.string().url().optional(),
  }),
});

export const collections = { blog, guides, education };
