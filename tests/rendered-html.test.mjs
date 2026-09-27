import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = path.join(repositoryRoot, "apps", "web");
const port = 3219;
const origin = `http://127.0.0.1:${port}`;

let server;
let serverOutput = "";

async function waitForServer() {
  const deadline = Date.now() + 25_000;

  while (Date.now() < deadline) {
    if (server?.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready.\n${serverOutput}`);
    }

    try {
      const response = await fetch(`${origin}/`, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for Next.js.\n${serverOutput}`);
}

before(async () => {
  await access(path.join(webRoot, ".next", "BUILD_ID"));

  server = spawn(
    "npm",
    ["run", "start", "--workspace", "@pullup/web", "--", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: repositoryRoot,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk.toString();
  });

  await waitForServer();
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
});

test("renders public product metadata without vendor preview ownership", async () => {
  const response = await fetch(`${origin}/`, { headers: { accept: "text/html" } });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /<title>PullUp \| Homes made for chillin&#x27; not flipping<\/title>/i);
  assert.match(html, /synthetic technical proof for fair housing discovery/i);
  assert.match(html, /Synthetic review fixture/i);
  assert.match(html, /No provider, price, availability, access claim, or housing policy shown here is live/i);
  assert.match(html, /Pull Up/i);
  assert.doesNotMatch(html, /pullup-prototype|codex-preview/i);
});

test("server-renders a complete, source-labelled Place Rundown", async () => {
  const response = await fetch(`${origin}/places/cedar-commons-g2`, {
    headers: { accept: "text/html" },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /The Rundown/i);
  assert.match(html, /Total Damage/i);
  assert.match(html, /Where It Goes/i);
  assert.match(html, /Specific facts, including what does not work/i);
  assert.match(html, /Allocation firewall/i);
  assert.match(html, /Sources and freshness/i);
  assert.match(html, /Synthetic review fixture/i);
  assert.doesNotMatch(html, /pullup-prototype|codex-preview/i);
});

test("does not render an unpublished Place slug", async () => {
  const response = await fetch(`${origin}/places/not-published`, {
    headers: { accept: "text/html" },
  });

  assert.equal(response.status, 404);
});
