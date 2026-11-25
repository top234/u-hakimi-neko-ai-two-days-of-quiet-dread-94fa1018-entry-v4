import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Approved. Two days without a single alert. Either the code is perfect, or the alerts died quietly two days ago.";

const points = [...LINE];
if (points.length < 1 || points.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${points.length}`);
}
if (LINE.trim().length === 0 || LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-empty line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the approved line");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("entry.txt byte length does not match the approved line");
}
