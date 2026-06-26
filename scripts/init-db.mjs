import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH ?? "./data/pet-learning.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
console.log(`Database directory ready: ${path.dirname(dbPath)}`);
console.log("The Next.js server initializes tables and seed data on first request.");
