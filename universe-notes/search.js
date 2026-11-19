import { readFile } from "node:fs/promises";

const query = process.argv.slice(2).join(" ").trim();
const word = query.toLowerCase();
if (!word) {
  console.error("Usage: npm run search -- <word>");
  process.exit(1);
}

const notesUrl = new URL("./notes/keynote-highlights.json", import.meta.url);
const { highlights } = JSON.parse(await readFile(notesUrl, "utf8"));

const matches = highlights.filter(({ title, summary }) =>
  `${title}\n${summary}`.toLowerCase().includes(word),
);

if (matches.length === 0) {
  console.log(`No highlights match "${query}".`);
}
for (const { topic, title, summary } of matches) {
  console.log(`${title} (${topic})`);
  console.log(`  ${summary}`);
}
