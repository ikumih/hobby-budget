const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");
const noJekyllPath = path.join(distDir, ".nojekyll");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html was not found. Run expo export first.");
}

let html = fs.readFileSync(indexPath, "utf8");

// GitHub project pages are served from /repo-name/. Relative asset paths keep
// the exported app working there and on localhost.
html = html
  .replaceAll('href="/', 'href="./')
  .replaceAll('src="/', 'src="./');

fs.writeFileSync(indexPath, html);
fs.writeFileSync(notFoundPath, html);
fs.writeFileSync(noJekyllPath, "");

console.log("Prepared dist for GitHub Pages.");
