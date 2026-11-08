import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", description: "The full browser title, exactly as it should appear." }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (r) => r.max(160).warning("Search engines usually cut descriptions after about 160 characters.") }),
  ],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for people using screen readers.",
      validation: (r) =>
        r.custom((alt, context) => {
          const parent = context.parent as { decorative?: boolean; asset?: unknown } | undefined;
          if (!parent?.asset || parent.decorative || alt) return true;
          return "Add alt text, or mark the image as decorative.";
        }),
    }),
    defineField({ name: "decorative", title: "Decorative image", type: "boolean", initialValue: false }),
  ],
});

/* Traceability back to Webflow. Hidden from editors and never shown on the site. */
export const legacy = defineType({
  name: "legacy",
  title: "Webflow record",
  type: "object",
  hidden: true,
  fields: [
    defineField({ name: "webflowItemId", type: "string" }),
    defineField({ name: "publishedAt", type: "string" }),
  ],
});

export const portableText = defineType({
  name: "portableText",
  title: "Body",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          },
        ],
      },
    },
    { type: "imageWithAlt" },
  ],
});
