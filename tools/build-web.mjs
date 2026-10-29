// Builds web/ (modern source) into app/src/main/assets so the launcher also runs on
// old Android TV WebViews (Android 7.x ships Chrome ~51–64). Target: Chrome 53.
//  - JavaScript: async/await, object spread, ?? ... lowered by esbuild, then verified with acorn (ES2016).
//  - CSS: logical properties (inset-inline-start, margin-inline...) turned into left/right for both
//         directions, `inset` expanded, `grid-gap` added, and a flex-gap fallback (.nofg) generated.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";
import postcss from "postcss";
import * as acorn from "acorn";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "web"), OUT = join(ROOT, "app/src/main/assets");
const TARGET = "chrome53";

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

// ---------- JavaScript ----------
let jsCount = 0;
for (const f of readdirSync(join(OUT, "js"))) {
  if (!f.endsWith(".js") || f.startsWith("lib-")) continue;
  const p = join(OUT, "js", f);
  const { code } = transformSync(readFileSync(p, "utf8"), { loader: "js", target: TARGET, charset: "utf8", legalComments: "none", minify: true });
  try { acorn.parse(code, { ecmaVersion: 2016, sourceType: "script" }); }
  catch (e) { console.error(`✗ ${f}: syntax newer than ES2016 remains — ${e.message}`); process.exit(1); }
  writeFileSync(p, code); jsCount++;
}

// ---------- CSS ----------
const splitTop = v => { const out = []; let depth = 0, cur = "";
  for (const ch of v.trim()) { if (ch === "(") depth++; if (ch === ")") depth--; if (/\s/.test(ch) && depth === 0) { if (cur) out.push(cur); cur = ""; } else cur += ch; }
  if (cur) out.push(cur); return out; };
const withPrefix = (sel, pre) => sel.trim().startsWith("html") ? sel.trim().replace(/^html/, "html" + pre) : `html${pre} ${sel.trim()}`;
const PHYS = {
  "inset-inline-start": { ltr: "left", rtl: "right" }, "inset-inline-end": { ltr: "right", rtl: "left" },
  "margin-inline-start": { ltr: "margin-left", rtl: "margin-right" }, "margin-inline-end": { ltr: "margin-right", rtl: "margin-left" },
  "padding-inline-start": { ltr: "padding-left", rtl: "padding-right" }, "padding-inline-end": { ltr: "padding-right", rtl: "padding-left" },
};
const PAIR = { "inset-inline": ["inset-inline-start", "inset-inline-end", "left", "right"], "margin-inline": ["margin-inline-start", "margin-inline-end", "margin-left", "margin-right"], "padding-inline": ["padding-inline-start", "padding-inline-end", "padding-left", "padding-right"] };

const compat = () => ({
  postcssPlugin: "tv-compat",
  OnceExit(root) {
    const dirRules = [];
    root.walkRules(rule => {
      if (rule.parent && rule.parent.type === "atrule" && /keyframes/.test(rule.parent.name)) return;
      const dirDecls = { ltr: [], rtl: [] };
      rule.walkDecls(d => {
        const imp = d.important ? " !important" : "";
        if (d.prop === "inset") {
          const v = splitTop(d.value); const [t, r = t, b = t, l = r] = v;
          d.replaceWith(postcss.decl({ prop: "top", value: t + imp }), postcss.decl({ prop: "right", value: r + imp }), postcss.decl({ prop: "bottom", value: b + imp }), postcss.decl({ prop: "left", value: l + imp }));
          return;
        }
        if (PAIR[d.prop]) {
          const v = splitTop(d.value), [s, e, pl, pr] = PAIR[d.prop];
          if (v.length === 1) { d.replaceWith(postcss.decl({ prop: pl, value: v[0] + imp }), postcss.decl({ prop: pr, value: v[0] + imp })); return; }
          dirDecls.ltr.push([PHYS[s].ltr, v[0] + imp], [PHYS[e].ltr, v[1] + imp]); dirDecls.rtl.push([PHYS[s].rtl, v[0] + imp], [PHYS[e].rtl, v[1] + imp]); d.remove(); return;
        }
        if (PHYS[d.prop]) { dirDecls.ltr.push([PHYS[d.prop].ltr, d.value + imp]); dirDecls.rtl.push([PHYS[d.prop].rtl, d.value + imp]); d.remove(); }
      });
      for (const dir of ["ltr", "rtl"]) if (dirDecls[dir].length)
        dirRules.push([rule, postcss.rule({ selectors: rule.selectors.map(s => withPrefix(s, `[dir=${dir}]`)), nodes: dirDecls[dir].map(([prop, value]) => postcss.decl({ prop, value })) })]);

      // gap: grid-gap for Chrome 57–65, margins for flex containers before Chrome 84 (html.nofg)
      const gap = rule.nodes && rule.nodes.find(n => n.type === "decl" && n.prop === "gap"); if (!gap) return;
      const disp = (rule.nodes.find(n => n.type === "decl" && n.prop === "display") || {}).value || "";
      const fdir = (rule.nodes.find(n => n.type === "decl" && n.prop === "flex-direction") || {}).value || "row";
      const wrap = /wrap/.test((rule.nodes.find(n => n.type === "decl" && n.prop === "flex-wrap") || {}).value || "");
      const [rg, cg = rg] = splitTop(gap.value);
      if (/grid/.test(disp)) { gap.cloneBefore({ prop: "grid-gap" }); return; }
      if (!/flex/.test(disp)) return;
      const kids = s => rule.selectors.map(x => withPrefix(x, s.pre) + " > " + s.kid);
      if (/column/.test(fdir)) dirRules.push([rule, postcss.rule({ selectors: kids({ pre: ".nofg", kid: "* + *" }), nodes: [postcss.decl({ prop: "margin-top", value: rg })] })]);
      else {
        dirRules.push([rule, postcss.rule({ selectors: kids({ pre: "[dir=ltr].nofg", kid: "* + *" }), nodes: [postcss.decl({ prop: "margin-left", value: cg })] })]);
        dirRules.push([rule, postcss.rule({ selectors: kids({ pre: "[dir=rtl].nofg", kid: "* + *" }), nodes: [postcss.decl({ prop: "margin-right", value: cg })] })]);
        if (wrap) dirRules.push([rule, postcss.rule({ selectors: kids({ pre: ".nofg", kid: "*" }), nodes: [postcss.decl({ prop: "margin-bottom", value: rg })] })]);
      }
    });
    for (const [after, r] of dirRules.reverse()) after.after(r);
  }
});
compat.postcss = true;
let cssCount = 0;
for (const f of readdirSync(join(OUT, "css"))) {
  if (!f.endsWith(".css")) continue;
  const p = join(OUT, "css", f);
  const out = postcss([compat()]).process(readFileSync(p, "utf8"), { from: p }).css;
  const left = out.match(/(inset-inline|margin-inline|padding-inline|(^|[;{\s])inset)\s*:/gm);
  if (left) { console.error(`✗ ${f}: logical properties remain: ${left.join(", ")}`); process.exit(1); }
  writeFileSync(p, out); cssCount++;
}
console.log(`✓ web → assets: ${jsCount} JS files lowered to ${TARGET} (checked as ES2016), ${cssCount} CSS files converted`);
