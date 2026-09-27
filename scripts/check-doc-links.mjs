import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const markdownFiles = [path.join(repositoryRoot, "README.md")];

function collectMarkdown(directory) {
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    if (statSync(absolutePath).isDirectory()) collectMarkdown(absolutePath);
    if (entry.endsWith(".md")) markdownFiles.push(absolutePath);
  }
}

collectMarkdown(path.join(repositoryRoot, "docs"));

const broken = [];
const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;

for (const markdownFile of markdownFiles) {
  const contents = readFileSync(markdownFile, "utf8");
  for (const match of contents.matchAll(markdownLink)) {
    const destination = match[1].trim().replace(/^<|>$/g, "");
    if (
      destination.startsWith("#") ||
      /^(?:https?:|mailto:|tel:)/i.test(destination)
    ) {
      continue;
    }

    const fileDestination = decodeURIComponent(destination.split(/[?#]/, 1)[0]);
    const resolved = path.resolve(path.dirname(markdownFile), fileDestination);
    if (!existsSync(resolved)) {
      broken.push(
        `${path.relative(repositoryRoot, markdownFile)} -> ${destination}`,
      );
    }
  }
}

if (broken.length) {
  console.error("Broken local Markdown links:\n" + broken.map((link) => `- ${link}`).join("\n"));
  process.exit(1);
}

console.log(`Checked ${markdownFiles.length} Markdown files; local links resolve.`);
