import fs from "node:fs";
import path from "node:path";

const examplesPath = path.resolve(process.cwd(), "src/lib/generated/pet-word-examples.ts");

// Natural examples must be reviewed content. Do not recreate theme-based examples here.
fs.writeFileSync(examplesPath, "export const generatedWordExamples = {} as const;\n");
console.log(`Cleared unreviewed PET word examples: ${examplesPath}`);
