/** Page metadata for `BaseHead` and layouts. */
export interface SeoProps {
  /** Page title. The site name is appended. */
  title?: string;
  /** Complete page title, used as written. Overrides `title`, to keep titles identical across a migration. */
  fullTitle?: string;
  /** Page and social description. Defaults to `SITE_DESCRIPTION`. */
  description?: string;
  /** Social image. Defaults to `/og-image.jpg`. */
  image?: string;
  /** Open Graph type. */
  type?: "website" | "article";
  /** Override `NOINDEX_ROUTES` for this page's robots tag. */
  noindex?: boolean;
}
