// Export the built app as a static site for GitHub Pages.
// Usage: npm run build, then `npm run preview` (serves 127.0.0.1:8081), then:
//   node scripts/export-gh-pages.mjs <outDir>
// Produces a single index.html (no React runtime) + CSS + images, with
// relative paths so it works under https://<user>.github.io/<repo>/.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2] ?? "gh-pages-out";
const staticDir = ".vercel/output/static";
mkdirSync(join(out, "assets"), { recursive: true });

let html = await (await fetch("http://127.0.0.1:8081/")).text();

// Drop all scripts (React hydration, platform injector) and JS preloads.
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
html = html.replace(/<link rel="modulepreload"[^>]*>/g, "");
html = html.replace(/<link rel="(manifest|apple-touch-icon)"[^>]*>/g, "");
html = html.replace(/<meta (name|property)="(og:[^"]*|twitter:[^"]*)"[^>]*>/g, "");
// Root-absolute → relative paths.
html = html.replace(/(src|href)="\/(?!\/)/g, '$1="./');

// Re-wire the mobile menu toggle (the only JS the page needs).
const script = `<script>
(function(){
  var btn=document.querySelector('button[aria-controls="mobile-menu"]');
  var menu=document.getElementById("mobile-menu");
  if(!btn||!menu) return;
  function set(o){ menu.hidden=!o; btn.setAttribute("aria-expanded",String(o)); }
  btn.addEventListener("click",function(){ set(menu.hidden); });
  menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ set(false); }); });
})();
document.querySelectorAll("[data-slider-prev],[data-slider-next]").forEach(function(b){
  b.addEventListener("click",function(){
    var id=b.getAttribute("data-slider-prev")||b.getAttribute("data-slider-next");
    var el=document.getElementById(id); if(!el) return;
    el.scrollBy({left:(b.hasAttribute("data-slider-prev")?-1:1)*el.clientWidth,behavior:"smooth"});
  });
});
</script>`;
html = html.replace("</body>", `${script}</body>`);
writeFileSync(join(out, "index.html"), html);

for (const f of readdirSync(join(staticDir, "assets"))) {
  if (f.endsWith(".css")) {
    // CSS lives in ./assets, so root-absolute urls become ../
    const css = readFileSync(join(staticDir, "assets", f), "utf8").replace(/url\(\s*(["']?)\/(?!\/)/g, "url($1../");
    writeFileSync(join(out, "assets", f), css);
  }
}
for (const f of readdirSync(staticDir)) {
  if (/\.(jpg|png|svg|webp)$/.test(f)) cpSync(join(staticDir, f), join(out, f));
}
writeFileSync(join(out, ".nojekyll"), "");
console.log("exported to", out, existsSync(join(out, "index.html")) ? "ok" : "FAILED");
