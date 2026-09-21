// ==========================================================================
// Pouya Salimi — dist build: minify HTML/JS/CSS into dist/
// ==========================================================================

import { minify as minifyHtml } from 'html-minifier-terser';
import { minify as minifyJs } from 'terser';
import {
  cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url)) + '/..';
const dist = join(root, 'dist');

// 1. Fresh dist
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 2. Static assets (images, PDF, webmanifest) — copied as-is
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });

// 3. Tailwind CSS is already minified by build:css — just copy it
mkdirSync(join(dist, 'css'), { recursive: true });
mkdirSync(join(dist, 'js'), { recursive: true });
cpSync(join(root, 'css/tailwind.css'), join(dist, 'css/tailwind.css'));

// 4. Minify JS with Terser
const jsSrc = readFileSync(join(root, 'js/scripts.js'), 'utf8');
const jsResult = await minifyJs(jsSrc, {
  module: false,
  compress: { passes: 2 },
  mangle: true,
  format: { comments: false },
});
if (!jsResult.code) throw new Error('Terser produced no output');
writeFileSync(join(dist, 'js/scripts.js'), jsResult.code);

// 5. Minify HTML (also minifies the inline theme script)
const htmlSrc = readFileSync(join(root, 'index.html'), 'utf8');
const htmlResult = await minifyHtml(htmlSrc, {
  collapseWhitespace: true,
  conservativeCollapse: false,
  removeComments: true,
  minifyJS: true,
  minifyCSS: cleanCss => cleanCss.replace(/\s*([{}:;>,])\s*/g, '$1').replace(/;}/g, '}'),
  minifyURLs: null,
  caseSensitive: true,
  keepClosingSlash: true,
});
writeFileSync(join(dist, 'index.html'), htmlResult);

// 6. GitHub Pages: disable Jekyll processing
cpSync(join(root, '.nojekyll'), join(dist, '.nojekyll'));

// 7. Report
const kb = p => (statSync(p).size / 1024).toFixed(1) + ' KB';
console.log(`dist/ built:
  index.html        ${kb(join(root, 'index.html'))} -> ${kb(join(dist, 'index.html'))}
  css/tailwind.css  ${kb(join(root, 'css/tailwind.css'))} -> ${kb(join(dist, 'css/tailwind.css'))}
  js/scripts.js     ${kb(join(root, 'js/scripts.js'))} -> ${kb(join(dist, 'js/scripts.js'))}
  assets/           copied (${relative(root, join(dist, 'assets'))})`);
