import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "exact-benefits",
  title: "Exact Benefits",
  projectId: "jwjdv5ck",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
