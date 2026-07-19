import assert from "node:assert/strict";
import { operationsCatalog, operationEvidenceTypes } from "../assets/operations-content.js";
import {
    operationIdFromHash,
    renderOperationsArchive,
    validateOperationsCatalog
} from "../assets/operations-workspace.js";

for (const [lang, catalog] of Object.entries(operationsCatalog)) {
    assert.deepEqual(validateOperationsCatalog(catalog), [], `Catálogo inválido: ${lang}`);
    assert.equal(catalog.files.length, 6);
    assert.deepEqual(catalog.files.map((file) => file.evidenceType), operationEvidenceTypes);
    assert.equal(operationIdFromHash("#op-01", catalog.files), "op-01");
    assert.equal(operationIdFromHash("#op-06", catalog.files), "op-06");
    assert.equal(operationIdFromHash("#op-07", catalog.files), null);

    const html = renderOperationsArchive(catalog);
    assert.equal((html.match(/data-action="operation-open"/g) ?? []).length, 6);
    assert.equal((html.match(/data-operation-article="op-/g) ?? []).length, 6);
    assert.equal(html.includes("aria-expanded"), false);
    assert.equal(html.includes("folder-drawer"), false);
}

console.log("Operations infrastructure checks passed.");
