import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { equivalentRoute, routePages, routes } from "../assets/content.js";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(projectRoot, "dist");

for (const page of routePages) {
    const html = await readFile(join(distRoot, routes[page.lang][page.key], "index.html"), "utf8");
    const canonical = `https://emanuelrocha.cat${routes[page.lang][page.key]}`;
    const xDefault = `https://emanuelrocha.cat${equivalentRoute(page, "ca")}`;

    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${xDefault}">`));
    assert.match(html, new RegExp(`<meta name="robots" content="${page.index ? "index, follow" : "noindex, follow"}">`));
    assert.doesNotMatch(html, /\{\{[A-Z0-9_]+\}\}/);
}

const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
assert.doesNotMatch(robots, /Disallow:\s*\/(?:ca\/contacte|es\/contacto)/);

const template = await readFile(join(projectRoot, "src/template.html"), "utf8");
const jsonLd = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(jsonLd, "No se ha encontrado el bloque JSON-LD.");
const expectedHash = `sha256-${createHash("sha256").update(jsonLd).digest("base64")}`;
const vercel = JSON.parse(await readFile(join(projectRoot, "vercel.json"), "utf8"));
const csp = vercel.headers.flatMap((rule) => rule.headers).find((header) => header.key === "Content-Security-Policy")?.value;
assert.ok(csp?.includes(`'${expectedHash}'`), "El hash CSP del JSON-LD no coincide con la plantilla.");

const cloudflareHeaders = await readFile(join(distRoot, "_headers"), "utf8");
assert.ok(cloudflareHeaders.includes(`'${expectedHash}'`), "El hash CSP de Cloudflare no coincide con la plantilla.");
assert.match(cloudflareHeaders, /Strict-Transport-Security: max-age=31536000; includeSubDomains/);

const cloudflareRedirects = await readFile(join(distRoot, "_redirects"), "utf8");
assert.match(cloudflareRedirects, /^\/ \/ca\/ 302\s*$/);

const notFound = await readFile(join(distRoot, "404.html"), "utf8");
assert.match(notFound, /<meta name="robots" content="noindex, follow">/);
assert.match(notFound, /\/assets\/styles\.css\?v=[a-f0-9]{12}/);

const defaultContact = await readFile(join(distRoot, "ca/contacte/index.html"), "utf8");
assert.doesNotMatch(defaultContact, /id="form-privacy"/);
assert.doesNotMatch(defaultContact, /id="legal-link"/);

const wrangler = JSON.parse(await readFile(join(projectRoot, "wrangler.jsonc"), "utf8"));
assert.equal(wrangler.pages_build_output_dir, "./dist");
assert.equal(wrangler.compatibility_date, "2026-07-19");

console.log("Generated site checks passed.");
