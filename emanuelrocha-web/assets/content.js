import { contactForms } from "./form-content.js";

export const routes = {
    ca: {
        home: "/ca/",
        A: "/ca/accio/",
        B: "/ca/cosmovisio/",
        contact: "/ca/contacte/",
        operations: "/ca/operacions/",
        legal: "/ca/legal/"
    },
    es: {
        home: "/es/",
        A: "/es/accion/",
        B: "/es/cosmovision/",
        contact: "/es/contacto/",
        operations: "/es/operaciones/",
        legal: "/es/legal/"
    }
};

export const copies = {
    ca: {
        tag: "Consultoria de comunicació",
        title: "Benvingut",
        back: "← Tornar",
        contact: "Contacte",
        cancel: "Cancel·lar",
        langActive: "Català",
        btnOperations: "Operacions",
        homeAria: "Anar a la pàgina d'inici",
        languageAria: "Canviar idioma",
        contactAria: "Obrir contacte",
        operationsAria: "Obrir operacions",
        proseHTML: `A un espai d'estratègia i arquitectura de la paraula adaptat a sistemes d'alt rendiment. Des d'aquí, pots triar entre confirmar la nostra sintonia i <button type="button" class="btn-inline-option" data-action="narrative" data-intent="A">passar a l'acció amb propòsit</button>, o bé aturar el temps per endinsar-te en la meva <button type="button" class="btn-inline-option" data-action="narrative" data-intent="B">cosmovisió de treball</button>.`,
        A: `<p class="scrolling-p">[ TEXT GUIA PER A CLIENT CALENT: confirmació de biaixos, certeses operatives, filosofia d'acció immediata i validació del seu propòsit comercial. ]</p><p class="scrolling-p">${contactForms.ca.closedCta.A.text} <button type="button" class="btn-inline-option" data-action="contact-from-narrative" data-intent="A">${contactForms.ca.closedCta.A.action}</button></p>`,
        B: `<p class="scrolling-p">[ TEXT GUIA PER A CLIENT TEMPERAT: la teva cosmovisió, el silenci de Puigcerdà, Bitcoin, el valor intangible del temps i la maduració lenta de les grans idees. ]</p><p class="scrolling-p">${contactForms.ca.closedCta.B.text} <button type="button" class="btn-inline-option" data-action="contact-from-narrative" data-intent="B">${contactForms.ca.closedCta.B.action}</button></p>`
    },
    es: {
        tag: "Consultoría de comunicación",
        title: "Bienvenido",
        back: "← Volver",
        contact: "Contacto",
        cancel: "Cancelar",
        langActive: "Castellano",
        btnOperations: "Operaciones",
        homeAria: "Ir a la página de inicio",
        languageAria: "Cambiar idioma",
        contactAria: "Abrir contacto",
        operationsAria: "Abrir operaciones",
        proseHTML: `A un espacio de estrategia y arquitectura de la palabra adaptado a sistemas de alto rendimiento. Desde aquí, puedes elegir entre confirmar nuestra sintonía y <button type="button" class="btn-inline-option" data-action="narrative" data-intent="A">pasar a la acción con propósito</button>, o bien detener el tiempo para adentrarte en mi <button type="button" class="btn-inline-option" data-action="narrative" data-intent="B">cosmovisión de trabajo</button>.`,
        A: `<p class="scrolling-p">[ TEXTO GUÍA PARA CLIENTE CALIENTE: confirmación de sesgos, certezas operativas, filosofía de acción inmediata y validación de su propósito comercial. ]</p><p class="scrolling-p">${contactForms.es.closedCta.A.text} <button type="button" class="btn-inline-option" data-action="contact-from-narrative" data-intent="A">${contactForms.es.closedCta.A.action}</button></p>`,
        B: `<p class="scrolling-p">[ TEXTO GUÍA PARA CLIENTE TEMPLADO: tu cosmovisión, el silencio de Puigcerdà, Bitcoin, el valor intangible del tiempo y la maduración lenta de las grandes ideas. ]</p><p class="scrolling-p">${contactForms.es.closedCta.B.text} <button type="button" class="btn-inline-option" data-action="contact-from-narrative" data-intent="B">${contactForms.es.closedCta.B.action}</button></p>`
    }
};

export const routePages = [
    { lang: "ca", key: "home", state: "welcome-ready", title: "Emanuel Rocha — Consultoria de comunicació", description: "Estratègia de comunicació i arquitectura de la paraula per ordenar decisions, narratives i sistemes de negoci.", index: true },
    { lang: "ca", key: "A", state: "narrative", title: "Acció i propòsit — Emanuel Rocha", description: "Una ruta per convertir objectius de comunicació en decisions i execució amb propòsit.", index: true },
    { lang: "ca", key: "B", state: "narrative", title: "Cosmovisió de treball — Emanuel Rocha", description: "La mirada, els criteris i les tensions que sostenen la manera de treballar d'Emanuel Rocha.", index: true },
    { lang: "ca", key: "contact", state: "contact", title: "Contacte — Emanuel Rocha", description: "Obre una conversa amb Emanuel Rocha sobre comunicació, estratègia o arquitectura de la paraula.", index: false },
    { lang: "ca", key: "operations", state: "operations", title: "Operacions — Emanuel Rocha", description: "Metodologia, fonts i referències que estructuren la manera de treballar d'Emanuel Rocha.", index: true },
    { lang: "es", key: "home", state: "welcome-ready", title: "Emanuel Rocha — Consultoría de comunicación", description: "Estrategia de comunicación y arquitectura de la palabra para ordenar decisiones, narrativas y sistemas de negocio.", index: true },
    { lang: "es", key: "A", state: "narrative", title: "Acción y propósito — Emanuel Rocha", description: "Una ruta para convertir objetivos de comunicación en decisiones y ejecución con propósito.", index: true },
    { lang: "es", key: "B", state: "narrative", title: "Cosmovisión de trabajo — Emanuel Rocha", description: "La mirada, los criterios y las tensiones que sostienen la forma de trabajar de Emanuel Rocha.", index: true },
    { lang: "es", key: "contact", state: "contact", title: "Contacto — Emanuel Rocha", description: "Abre una conversación con Emanuel Rocha sobre comunicación, estrategia o arquitectura de la palabra.", index: false },
    { lang: "es", key: "operations", state: "operations", title: "Operaciones — Emanuel Rocha", description: "Metodología, fuentes y referencias que estructuran la forma de trabajar de Emanuel Rocha.", index: true }
];

export function equivalentRoute(page, lang) {
    return routes[lang][page.key];
}
