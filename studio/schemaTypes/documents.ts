import { defineField, defineType } from "sanity";

const legacyField = defineField({ name: "legacy", type: "legacy", hidden: true });
const slugField = (source: string) =>
  defineField({
    name: "slug",
    type: "slug",
    options: { source },
    description: "Part of the page URL. Changing it on a live page needs a redirect first.",
    validation: (r) => r.required(),
  });

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Categories",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField("title"),
    legacyField,
  ],
});

export const post = defineType({
  name: "post",
  title: "Blogs",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField("title"),
    defineField({ name: "mainImage", title: "Main image", type: "imageWithAlt" }),
    defineField({ name: "publishDate", title: "Date", type: "date" }),
    defineField({ name: "category", type: "reference", to: [{ type: "blogCategory" }] }),
    defineField({ name: "excerpt", title: "Short intro", type: "text", rows: 3 }),
    defineField({ name: "issueNumber", title: "Issue number", type: "number" }),
    defineField({ name: "body", type: "portableText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    legacyField,
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "publishDate", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishDate", media: "mainImage" } },
});

export const educationPiece = defineType({
  name: "educationPiece",
  title: "Educations",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField("title"),
    defineField({ name: "startsAt", title: "Starts", type: "datetime" }),
    defineField({ name: "endsAt", title: "Ends", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "excerpt", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Description", type: "portableText" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "rsvpUrl", title: "RSVP link", type: "url" }),
    defineField({ name: "speaker", type: "string" }),
    defineField({ name: "speakerHeadshots", title: "Speaker headshots", type: "array", of: [{ type: "imageWithAlt" }] }),
    defineField({ name: "recordingUrl", title: "Recording link", type: "url" }),
    defineField({ name: "recordingDescription", title: "Recording description", type: "portableText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    legacyField,
  ],
});

export const partner = defineType({
  name: "partner",
  title: "Partners",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slugField("name"),
    defineField({ name: "logo", type: "imageWithAlt" }),
    defineField({ name: "sortOrder", title: "Position in the logo strip", type: "number" }),
    legacyField,
  ],
  orderings: [{ title: "Logo strip order", name: "sortAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
});
