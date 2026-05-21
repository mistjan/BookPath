import fs from "fs";
let c = fs.readFileSync("apps/web/app/layout.tsx", "utf-8");
if (!c.includes("setStorageBackend")) {
  const inj = `import { setStorageBackend } from "@bookpath/core";\n\nif (typeof window !== "undefined") {\n  setStorageBackend({\n    get: async (key) => { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; },\n    set: async (key, value) => { localStorage.setItem(key, JSON.stringify(value)); },\n    remove: async (key) => { localStorage.removeItem(key); },\n  });\n}\n\n`;
  c = c.replace("import './globals.css';", "import './globals.css';\n" + inj);
  fs.writeFileSync("apps/web/app/layout.tsx", c, "utf-8");
  console.log("Web storage backend added");
}
