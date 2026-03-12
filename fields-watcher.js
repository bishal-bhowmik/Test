import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);
const modulesDir = path.join(rootDir, "modules");

console.log(
  "Native Watcher Activated: Watching 'modules' folder for changes to any fields.js file...",
);

// Starting Native Watcher
fs.watch(modulesDir, { recursive: true }, (eventType, filename) => {
  // Strictly ignoring anything that isn't fields.js
  if (!filename || !filename.endsWith("fields.js")) {
    return;
  }

  console.log(`\n⚡️ Change detected: ${filename}`);

  // Resolving Paths
  const fullPath = path.join(modulesDir, filename);
  const fileDir = path.dirname(fullPath);
  const baseName = path.basename(fullPath);

  // Executing Compilation
  exec(`node "${baseName}"`, { cwd: fileDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error compiling ${filename}:`);
      console.error(error.message);
      return;
    }

    if (stderr) {
      // stderr warnings log
      console.warn(`⚠️ Warning: ${stderr}`);
    }

    // Success message
    console.log(`✅ Re-compiled: ${baseName}`);
    if (stdout) console.log(stdout.trim());
  });
});
