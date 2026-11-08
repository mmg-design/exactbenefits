import { defineCollection } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import { z } from "astro/zod";
import { imageUrl, renderBody, sanity } from "@/lib/sanity.ts";

type Row = Record<string, unknown> & { id: string; body?: unknown[] };

/** Loads published Sanity documents into a collection at build time. */
function sanityLoader(name: string, query: string, shape: (row: Row) => Record<string, unknown>): Loader {
  return {
    name,
    load: async ({ store, parseData }) => {
      const rows = await sanity.fetch<Row[]>(query);
      store.clear();
      for (const row of rows) {
        const raw = Object.fromEntries(Object.entries(shape(row)).filter(([, value]) => value != null));
        const data = await parseData({ id: row.id, data: raw });
        const rendered = row.body ? renderBody(row.body) : undefined;
        store.set({
          id: row.id,
          data,
          rendered: rendered ? { html: rendered.html, metadata: { headings: rendered.headings } } : undefined,
        });
      }
    },
  };
}

const body = `"body": body[]{..., _type == "imageWithAlt" => {..., "url": asset->url, "dimensions": asset->metadata.dimensions}}`;

const blog = defineCollection({
  loader: sanityLoader(
    "sanity-blog",
    `*[_type == "post" && defined(slug.current)]{
      "id": slug.current, title, "metaTitle": seo.title, "description": seo.description,
      "date": publishDate, "category": category->title, "intro": excerpt, "issue": issueNumber,
      "mainImage": mainImage.asset->url, "mainImageAlt": mainImage.alt, ${body}
    }`,
    (row) => ({ ...row, body: undefined, id: undefined, mainImage: imageUrl(row.mainImage as string) }),
  ),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    intro: z.string().optional(),
    issue: z.number().optional(),
    mainImage: z.string(),
    mainImageAlt: z.string().optional(),
  }),
});

const education = defineCollection({
  loader: sanityLoader(
    "sanity-education",
    `*[_type == "educationPiece" && defined(slug.current)]{
      "id": slug.current, title, "fullTitle": seo.title, "description": seo.description,
      "short": excerpt, location, "date": startsAt, "videoUrl": recordingUrl, ${body}
    }`,
    (row) => ({ ...row, body: undefined, id: undefined }),
  ),
  schema: z.object({
    title: z.string(),
    fullTitle: z.string(),
    description: z.string(),
    short: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    videoUrl: z.url().optional(),
  }),
});

const partners = defineCollection({
  loader: sanityLoader(
    "sanity-partners",
    `*[_type == "partner" && defined(slug.current) && defined(logo.asset)] | order(sortOrder asc){
      "id": slug.current, name, sortOrder, "logo": logo.asset->url,
      "logoWidth": logo.asset->metadata.dimensions.width, "logoHeight": logo.asset->metadata.dimensions.height
    }`,
    (row) => ({ ...row, id: undefined }),
  ),
  schema: z.object({
    name: z.string(),
    sortOrder: z.number().optional(),
    logo: z.string(),
    logoWidth: z.number(),
    logoHeight: z.number(),
  }),
});

/* Guides are Webflow static pages, not CMS items, so they stay in the repo. */
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

export const collections = { blog, guides, education, partners };
