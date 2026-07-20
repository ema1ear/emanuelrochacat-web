import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { copies, equivalentRoute, routePages, routes } from "../assets/content.js";
import { contactForms } from "../assets/form-content.js";
import { legalPages } from "../assets/legal-content.js";
import { operationsCatalog } from "../assets/operations-content.js";
import { renderOperationsArchive, validateOperationsCatalog } from "../assets/operations-workspace.js";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = process.env.BUILD_OUTPUT_DIR
    ? resolve(projectRoot, process.env.BUILD_OUTPUT_DIR)
    : join(projectRoot, "dist");
const template = await readFile(join(projectRoot, "src/template.html"), "utf8");
const legalTemplate = await readFile(join(projectRoot, "src/legal-template.html"), "utf8");
const errorTemplate = await readFile(join(projectRoot, "src/404.html"), "utf8");

const publishLegal = process.env.LEGAL_PUBLISH === "true";
const cloudflareProduction = process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH === "main";
const legalVariables = {
    nif: process.env.LEGAL_NIF?.trim(),
    addresses: {
        ca: process.env.LEGAL_ADDRESS_CA?.trim(),
        es: process.env.LEGAL_ADDRESS_ES?.trim()
    }
};

if (cloudflareProduction && !publishLegal) {
    throw new Error(
        "El despliegue de producción en Cloudflare Pages requiere LEGAL_PUBLISH=true y las variables legales. "
        + "Configúralas en Settings > Environment variables antes de reintentar el build."
    );
}

if (publishLegal) {
    const missing = [
        ["LEGAL_NIF", legalVariables.nif],
        ["LEGAL_ADDRESS_CA", legalVariables.addresses.ca],
        ["LEGAL_ADDRESS_ES", legalVariables.addresses.es]
    ].filter(([, value]) => !value).map(([name]) => name);
    if (missing.length) {
        throw new Error(`LEGAL_PUBLISH=true requiere estas variables: ${missing.join(", ")}`);
    }
}

async function calculateAssetVersion() {
    const assetRoot = join(projectRoot, "assets");
    const files = (await readdir(assetRoot, { recursive: true, withFileTypes: true }))
        .filter((entry) => entry.isFile())
        .map((entry) => join(entry.parentPath ?? entry.path, entry.name))
        .sort();
    const hash = createHash("sha256");
    for (const file of files) hash.update(await readFile(file));
    return hash.digest("hex").slice(0, 12);
}

const assetVersion = await calculateAssetVersion();

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function replacements(page) {
    const copy = copies[page.lang];
    const form = contactForms[page.lang];
    const operations = operationsCatalog[page.lang];
    const canonicalPath = routes[page.lang][page.key];
    const isHome = page.key === "home";
    const isNarrative = page.key === "A" || page.key === "B";
    const isContact = page.key === "contact";
    const isOperations = page.key === "operations";
    const contactValue = (value) => isContact ? value : "";
    const narrative = isNarrative ? copy[page.key] : "";
    return {
        LANG: page.lang,
        ROBOTS: page.index ? "index, follow" : "noindex, follow",
        TITLE: escapeHtml(page.title),
        DESCRIPTION: escapeHtml(page.description),
        CANONICAL: `https://emanuelrocha.cat${canonicalPath}`,
        ALTERNATE_CA: `https://emanuelrocha.cat${equivalentRoute(page, "ca")}`,
        ALTERNATE_ES: `https://emanuelrocha.cat${equivalentRoute(page, "es")}`,
        ALTERNATE_DEFAULT: `https://emanuelrocha.cat${equivalentRoute(page, "ca")}`,
        OG_LOCALE: page.lang === "ca" ? "ca_ES" : "es_ES",
        ASSET_VERSION: assetVersion,
        INITIAL_STATE: page.key === "home" ? "intro" : page.state,
        ROUTE_KEY: page.key,
        FOCUS_MODE: page.key === "home"
            ? "welcome"
            : page.state === "narrative"
                ? "narrative"
                : page.state === "operations" ? "operations-scroll" : page.state,
        PAGE_HEADING: escapeHtml(page.heading),
        SKIP_TEXT: page.lang === "ca" ? "Saltar al contingut" : "Saltar al contenido",
        HOME_URL: routes[page.lang].home,
        CONTACT_URL: routes[page.lang].contact,
        OPERATIONS_URL: routes[page.lang].operations,
        TAG: copy.tag,
        WELCOME_TITLE: isHome ? copy.title : "",
        WELCOME_HTML: isHome ? copy.proseHTML : "",
        NARRATIVE_LABEL: page.lang === "ca" ? "Text narratiu" : "Texto narrativo",
        NARRATIVE_HTML: narrative,
        CONTACT_HEADING: isContact ? (page.lang === "ca" ? "Formulari de contacte" : "Formulario de contacto") : "",
        NAME_LABEL: contactValue(form.common.nameLabel),
        NAME_PLACEHOLDER: contactValue(form.common.namePlaceholder),
        EMAIL_LABEL: contactValue(form.common.emailLabel),
        EMAIL_PLACEHOLDER: contactValue(form.common.emailPlaceholder),
        FORM_INTENT_LEAD: contactValue(form.intentLead),
        INTENT_A: contactValue(form.intentA),
        INTENT_B: contactValue(form.intentB),
        A_PROJECT_LABEL: contactValue(form.A.project.label),
        A_PROJECT_PLACEHOLDER: contactValue(form.A.project.placeholder),
        A_STARTING_LABEL: contactValue(form.A.startingPoint.label),
        A_STARTING_PLACEHOLDER: contactValue(form.A.startingPoint.placeholder),
        A_SUCCESS_LABEL: contactValue(form.A.success.label),
        A_SUCCESS_PLACEHOLDER: contactValue(form.A.success.placeholder),
        A_URGENCY_LABEL: contactValue(form.A.urgency.label),
        A_URGENCY_ASAP: contactValue(form.A.urgency.asap),
        A_URGENCY_DATE: contactValue(form.A.urgency.date),
        A_URGENCY_OPEN: contactValue(form.A.urgency.open),
        A_DATE_LABEL: contactValue(form.A.urgency.dateLabel),
        B_SITUATION_LABEL: contactValue(form.B.situation.label),
        B_SITUATION_PLACEHOLDER: contactValue(form.B.situation.placeholder),
        B_ATTEMPTS_LABEL: contactValue(form.B.attempts.label),
        B_ATTEMPTS_PLACEHOLDER: contactValue(form.B.attempts.placeholder),
        B_SUCCESS_LABEL: contactValue(form.B.success.label),
        B_SUCCESS_PLACEHOLDER: contactValue(form.B.success.placeholder),
        OPTIONAL: contactValue(form.B.attempts.optional),
        FORM_PROMISE: contactValue(form.common.promise),
        FORM_PRIVACY_HTML: publishLegal
            ? `<p class="form-privacy" id="form-privacy">${escapeHtml(contactValue(form.common.privacy))}${isContact ? " " : ""}<a id="form-privacy-link" href="${routes[page.lang].legal}">${escapeHtml(contactValue(form.common.privacyLink))}</a></p>`
            : "",
        FORM_PREVIOUS: form.common.previous,
        FORM_CONTINUE: form.common.continue,
        SUBMIT: contactValue(form.common.submit),
        OPERATIONS_HEADING: isOperations ? (page.lang === "ca" ? "Operacions de treball" : "Operaciones de trabajo") : "",
        OPERATIONS_INTRO: isOperations ? operations.intro : "",
        CABINET_HTML: isOperations ? renderOperationsArchive(operations) : "",
        CONTACT: copy.contact,
        BACK: copy.back,
        OPERATIONS: copy.btnOperations,
        LANGUAGE_ARIA: copy.languageAria,
        LANGUAGE_ACTIVE: copy.langActive,
        CANCEL: copy.cancel,
        OPERATIONS_LEFT: operations.labels.archives,
        OPERATIONS_PROGRESS: "",
        OPERATIONS_RIGHT: operations.labels.next,
        LEGAL_LINK_HTML: publishLegal
            ? `<a class="legal-link" id="legal-link" href="${routes[page.lang].legal}">Legal</a>`
            : ""
    };
}

for (const [lang, catalog] of Object.entries(operationsCatalog)) {
    const errors = validateOperationsCatalog(catalog);
    if (errors.length) throw new Error(`Invalid operations catalog (${lang}):\n${errors.join("\n")}`);
}

function render(page) {
    const values = replacements(page);
    return Object.entries(values).reduce(
        (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
        template
    );
}

function renderLegal(lang) {
    const content = legalPages[lang];
    const values = {
        LANG: lang,
        TITLE: escapeHtml(content.title),
        DESCRIPTION: escapeHtml(content.description),
        CANONICAL: `https://emanuelrocha.cat${routes[lang].legal}`,
        HOME_URL: routes[lang].home,
        ALTERNATE_URL: routes[lang === "ca" ? "es" : "ca"].legal,
        ALTERNATE_LANG: lang === "ca" ? "es" : "ca",
        SKIP_TEXT: lang === "ca" ? "Saltar al contingut" : "Saltar al contenido",
        TAG: lang === "ca" ? "Consultoria de comunicació" : "Consultoría de comunicación",
        HEADING: content.heading,
        LEGAL_CONTENT: content.render({
            nif: escapeHtml(legalVariables.nif),
            address: escapeHtml(legalVariables.addresses[lang])
        }),
        UPDATED: content.updated,
        BACK: content.back,
        HOME: content.home,
        LANGUAGE: content.language,
        ASSET_VERSION: assetVersion
    };
    return Object.entries(values).reduce(
        (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
        legalTemplate
    );
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(projectRoot, "assets"), join(outputRoot, "assets"), { recursive: true });
await cp(join(projectRoot, "public"), outputRoot, { recursive: true });

for (const page of routePages) {
    const directory = join(outputRoot, routes[page.lang][page.key]);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "index.html"), render(page), "utf8");
}

if (publishLegal) {
    for (const lang of ["ca", "es"]) {
        const directory = join(outputRoot, routes[lang].legal);
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, "index.html"), renderLegal(lang), "utf8");
    }
}

const rootHtml = `<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=/ca/">
    <link rel="canonical" href="https://emanuelrocha.cat/ca/">
    <title>Emanuel Rocha</title>
</head>
<body>
    <p><a href="/ca/">Continua en català</a> · <a href="/es/">Continuar en castellano</a></p>
</body>
</html>`;
await writeFile(join(outputRoot, "index.html"), rootHtml, "utf8");
await writeFile(
    join(outputRoot, "404.html"),
    errorTemplate.replaceAll("{{ASSET_VERSION}}", assetVersion),
    "utf8"
);

const indexedPages = routePages.filter((page) => page.index);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedPages.map((page) => `    <url><loc>https://emanuelrocha.cat${routes[page.lang][page.key]}</loc></url>`).join("\n")}
</urlset>`;
await writeFile(join(outputRoot, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /

Sitemap: https://emanuelrocha.cat/sitemap.xml
`;
await writeFile(join(outputRoot, "robots.txt"), robots, "utf8");

console.log(`Built ${routePages.length} localized pages${publishLegal ? " plus 2 legal pages" : " (legal pages disabled)"} in ${outputRoot}.`);
