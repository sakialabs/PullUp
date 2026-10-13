import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "pullup-openapi-"));
const temporarySpec = path.join(temporaryDirectory, "pullup-api.v1.json");
const temporaryTypes = path.join(temporaryDirectory, "pullup-api.ts");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      UV_CACHE_DIR: process.env.PULLUP_UV_CACHE_DIR ?? "/tmp/pullup-uv-cache",
    },
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`${command} failed\n${result.stdout}\n${result.stderr}`);
  }
}

try {
  run("uv", [
    "run",
    "--project",
    "apps/api",
    "python",
    "scripts/export-openapi.py",
    "--output",
    temporarySpec,
  ]);
  run(path.join(repositoryRoot, "node_modules/.bin/openapi-typescript"), [
    temporarySpec,
    "-o",
    temporaryTypes,
  ]);

  const trackedSpec = await readFile(
    path.join(repositoryRoot, "packages/contracts/openapi/pullup-api.v1.json"),
  );
  const trackedTypes = await readFile(
    path.join(repositoryRoot, "packages/contracts/src/generated/pullup-api.ts"),
  );
  assert.deepEqual(trackedSpec, await readFile(temporarySpec), "OpenAPI document has drifted");
  assert.deepEqual(trackedTypes, await readFile(temporaryTypes), "API client types have drifted");
  console.log("OpenAPI document and generated TypeScript client are current.");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
