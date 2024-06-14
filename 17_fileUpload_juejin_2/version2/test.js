// console.log(__dirname);
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ss = path.resolve(__dirname, "..", "dddd");
console.log(ss);
