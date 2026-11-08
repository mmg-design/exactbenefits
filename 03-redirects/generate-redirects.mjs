// Generates site/public/_redirects from redirect-map.csv and validates the map.
// Run after `npm run build` in site/: node 03-redirects/generate-redirects.mjs
// Exits non-zero on a duplicate, chain, loop, dead target or clash with a real page.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://www.exactbenefits.com";
const dist = path.join(here, "../site/dist");
const LIMIT = 2000;

const parse = (line) => {
  const out = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted && c === '"' && line[i + 1] === '"') { cell += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === "," && !quoted) { out.push(cell); cell = ""; }
    else cell += c;
  }
  out.push(cell);
  return out;
};

const rows = fs.readFileSync(path.join(here, "redirect-map.csv"), "utf8")
  .split("\n")
  .filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("old_url,"))
  .map((l) => {
    const [from, to, code] = parse(l);
    return { from, to, code };
  });

// Host-level rules live in Cloudflare, not in _redirects.
const pathRows = rows.filter((r) => r.from.startsWith(`${SITE}/`));
const skipped = rows.filter((r) => !r.from.startsWith(`${SITE}/`));
const clean = (u) => u.replace(SITE, "") || "/";
const pairs = pathRows.map((r) => ({ from: clean(r.from), to: clean(r.to), code: r.code }));

const routes = new Set();
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith(".html")) {
      const rel = path.relative(dist, full).replaceAll(path.sep, "/").replace(/\.html$/, "");
      routes.add(rel === "index" ? "/" : `/${rel}`);
    }
  }
};
walk(dist);

const errors = [];
const sources = new Map();
for (const p of pairs) {
  if (sources.has(p.from)) errors.push(`duplicate source: ${p.from}`);
  sources.set(p.from, p.to);
}
for (const p of pairs) {
  const target = p.to.split("#")[0].split("?")[0];
  if (p.from === target) errors.push(`loop: ${p.from} redirects to itself`);
  if (sources.has(target)) errors.push(`chain: ${p.from} -> ${target} -> ${sources.get(target)}`);
  if (!routes.has(target)) errors.push(`dead target: ${p.from} -> ${target}`);
  if (routes.has(p.from)) errors.push(`clashes with a real page: ${p.from}`);
  if (!["301", "302"].includes(p.code)) errors.push(`bad status ${p.code}: ${p.from}`);
}
if (pairs.length * 2 > LIMIT) errors.push(`over the ${LIMIT} rule limit: ${pairs.length}`);

// Longer loops, which the single-hop check above would also report as chains.
for (const start of sources.keys()) {
  const seen = new Set([start]);
  let at = sources.get(start);
  while (sources.has(at)) {
    if (seen.has(at)) { errors.push(`loop through: ${at}`); break; }
    seen.add(at);
    at = sources.get(at);
  }
}

if (errors.length) {
  console.error(`FAILED (${errors.length}):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

// Cloudflare only normalizes slashes on real pages, so /old/ needs its own rule.
const withSlashes = pairs.flatMap((p) =>
  p.from.endsWith("/") || p.from.endsWith(".") || p.from.includes("%20")
    ? [p]
    : [p, { ...p, from: `${p.from}/` }],
);

const header = [
  "# GENERATED from 03-redirects/redirect-map.csv. Do not edit by hand.",
  "# The apex-to-www redirect lives in Cloudflare, not here.",
];
fs.writeFileSync(
  path.join(here, "../site/public/_redirects"),
  `${[...header, ...withSlashes.map((p) => `${p.from} ${p.to} ${p.code}`)].join("\n")}\n`,
);
console.log(`OK: ${withSlashes.length} rules written (${pairs.length} from the map plus slash variants); ${skipped.length} host-level rule(s) left to Cloudflare; ${routes.size} routes checked; 0 chains, 0 loops, 0 dead targets.`);
