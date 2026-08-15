import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the academic paper page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>MacroMosaic — Complexity and Decidability of Knot-Mosaic Completion<\/title>/i,
  );
  assert.match(html, /Complexity and Decidability Frontiers/);
  assert.match(html, /Canonical result map/);
  assert.match(html, /Bounded raw decision/);
  assert.match(html, /NP-hard and r\.e\./);
  assert.match(html, /What remains open/);
  assert.doesNotMatch(html, /taking shape|product launch|all open problems solved/i);
});

test("keeps the canonical scope and browser verifier in source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /BKW11_U/);
  assert.match(page, /Parsimoniously #P-complete/);
  assert.match(page, /No NP upper bound, r\.e\.-hardness, or r\.e\.-completeness/);
  assert.match(page, /no frozen signed crossing/i);
  assert.match(page, /one hyperelliptic conjugacy class/i);
  assert.match(page, /fixed complementary handlebody/i);
  assert.match(page, /superseded for bounded hardness/i);
  assert.match(page, /pyodide\/v0\.27\.7/);
  assert.match(page, /forced\.issubset/);
  assert.match(layout, /title:\s*"MacroMosaic — Complexity and Decidability/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
