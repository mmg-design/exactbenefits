import { createClient } from "@sanity/client";
import { toHTML, type PortableTextBlockComponent } from "@portabletext/to-html";
import GithubSlugger from "github-slugger";

/* Public dataset: the project ID is not a secret and no token is needed to read published content. */
export const sanity = createClient({
  projectId: "jwjdv5ck",
  dataset: "production",
  apiVersion: "2025-02-19",
  useCdn: false,
  perspective: "published",
});

/** A sized, compressed version of a Sanity image. */
export const imageUrl = (url: string, width = 1600) => `${url}?w=${width}&auto=format&q=82`;

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Heading = { depth: number; slug: string; text: string };

/** Turns a Portable Text body into HTML, plus the headings for the table of contents. */
export function renderBody(body: unknown[] = []) {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  const heading =
    (depth: 2 | 3): PortableTextBlockComponent =>
    ({ children, value }) => {
      const text = value.children.map((child) => ("text" in child ? String(child.text) : "")).join("");
      const slug = slugger.slug(text);
      headings.push({ depth, slug, text });
      return `<h${depth} id="${slug}">${children}</h${depth}>`;
    };

  const html = toHTML(body as never, {
    components: {
      block: { h2: heading(2), h3: heading(3) },
      marks: {
        link: ({ children, value }) => `<a href="${escapeAttr(value?.href ?? "")}">${children}</a>`,
      },
      types: {
        imageWithAlt: ({ value }) => {
          const { width, height } = value.dimensions ?? {};
          const size = width && height ? ` width="${Math.min(width, 1400)}" height="${Math.round((Math.min(width, 1400) / width) * height)}"` : "";
          return `<img src="${escapeAttr(imageUrl(value.url, 1400))}" alt="${escapeAttr(value.alt ?? "")}"${size} loading="lazy" decoding="async" />`;
        },
      },
    },
  });

  return { html, headings };
}
