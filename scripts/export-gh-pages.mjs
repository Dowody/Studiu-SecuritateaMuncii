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

const NAV = [...html.matchAll(/<nav class="hidden gap-1 lg:flex">([\s\S]*?)<\/nav>/g)][0]?.[1] ?? "";
const mobileLinks = [...NAV.matchAll(/<a href="([^"]+)"[^>]*>([^<]*)<\/a>/g)]
  .map(([, href, label]) => `<a href="${href}" class="py-2 text-sm font-medium text-white">${label}</a>`)
  .join("");
const mobileMenu = `<div id="mobile-menu" hidden class="flex flex-col border-t border-white/10 bg-[#0a355c] px-4 py-2 lg:hidden">${mobileLinks}</div>`;
html = html.replace(/(<header[\s\S]*?)(<\/header>)/, `$1${mobileMenu}$2`);

const script = `<script>
(function(){
  var header=document.querySelector("header"); if(!header) return;
  var logo=header.querySelector('a[href="#top"]');
  var links=header.querySelectorAll("nav a");
  var btn=header.querySelector("button");
  var menu=document.getElementById("mobile-menu");
  function sw(el,on,off,s){ if(!el) return; (s?off:on).split(" ").forEach(function(c){el.classList.remove(c)}); (s?on:off).split(" ").forEach(function(c){el.classList.add(c)}); }
  function update(){
    var s=window.scrollY>24;
    sw(header,"border-slate-200 bg-white/95 shadow-sm","border-white/20 bg-[#0a355c]/55",s);
    sw(logo,"text-[#0f4c81]","text-white",s);
    links.forEach(function(a){ sw(a,"text-slate-600 hover:bg-[#0f4c81]/10","text-white/90 hover:bg-white/15",s); });
    sw(btn,"border-slate-200","border-white/40 text-white",s);
  }
  update(); window.addEventListener("scroll",update,{passive:true});
  if(btn&&menu){
    btn.addEventListener("click",function(){ menu.hidden=!menu.hidden; btn.setAttribute("aria-expanded",String(!menu.hidden)); });
    menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ menu.hidden=true; btn.setAttribute("aria-expanded","false"); }); });
  }
})();
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
