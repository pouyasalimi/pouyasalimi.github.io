# Pouya Salimi - Personal Portfolio & Resume

A fast, minimalist, responsive portfolio website built with **HTML5 + Tailwind CSS (v3, pre-compiled)** and vanilla JavaScript — no runtime CSS framework, no Bootstrap. Dark-first design with a light/dark mode toggle, subtle glow accents, and a clean single-page layout.

Live URL: [https://pouyasalimi.github.io](https://pouyasalimi.github.io)

## Features

- **Tailwind-powered minimalist design**: Design tokens (colors, borders, accents) as CSS variables mapped into the Tailwind theme — `border-line`, `text-ink-dim`, `bg-accent-soft`, etc.
- **Theme switcher**: Dark / Light toggle with `localStorage` persistence, restored before first paint (no flash).
- **Responsive navigation**: Sticky blurred navbar with scrollspy active-link highlighting and a mobile drawer.
- **Career timeline**: Vertical timeline detailing work experience, achievements, and technology tags.
- **Skills matrix**: Categorized tech stacks (Languages & Frameworks, DevOps & Tooling, Architecture & Process).
- **Contact card**: Email copy-to-clipboard with instant visual feedback and social profile links.
- **Zero-config GitHub Pages**: Pure static assets (`index.html`, `css/tailwind.css`, `js/`, `assets/`), served from the root of `main`. `.nojekyll` included.

## Project structure

```
├── index.html            # Single-page markup (Tailwind utility classes)
├── css/tailwind.css      # Pre-compiled, minified Tailwind output (~17 KB) — commit this
├── src/input.css         # Tailwind entry: design tokens + @layer base/components/utilities
├── tailwind.config.js    # Theme mapping (colors, fonts, container width)
├── js/scripts.js         # Vanilla JS: theme toggle, scrollspy, mobile menu, copy email
└── assets/img/           # Portrait, favicons, webmanifest
```

## Local development

```bash
npm install          # one-time (devDependency: tailwindcss v3)

# Rebuild CSS after editing classes or tokens in src/input.css
npm run build      # or: npx tailwindcss -i ./src/input.css -o ./css/tailwind.css --minify

# Watch mode during development
npm run watch      # or: npx tailwindcss -i ./src/input.css -o ./css/tailwind.css --watch

# Serve locally
python3 -m http.server 8080
# or: npx serve .
```

Visit `http://localhost:8080` in your browser.

> **Important:** `css/tailwind.css` is a build artifact but is committed so GitHub Pages needs no build step. After changing Tailwind classes in `index.html` or tokens in `src/input.css`, re-run `npm run build` and commit the output.

## Deploying to GitHub Pages

1. **Add your remote repository** (if not already configured):

   ```bash
   git remote add origin git@github.com:pouyasalimi/pouyasalimi.github.io.git
   # or via HTTPS:
   # git remote add origin https://github.com/pouyasalimi/pouyasalimi.github.io.git
   ```

2. **Commit and push**:

   ```bash
   git add .
   git commit -m "feat: redesign portfolio with Tailwind CSS"
   git branch -M main
   git push -u origin main
   ```

3. **Verify GitHub Pages setting**:
   - Go to `https://github.com/pouyasalimi/pouyasalimi.github.io/settings/pages`
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
