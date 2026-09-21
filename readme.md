# Pouya Salimi - Personal Portfolio & Resume

A fast, modern, responsive portfolio website built with HTML5, CSS3, modern JavaScript, and Bootstrap 5.3. Features a dark-first theme with dynamic light/dark mode toggling, glassmorphism aesthetics, vertical timeline, and smooth scroll navigation.

Live URL: [https://pouyasalimi.github.io](https://pouyasalimi.github.io)

## 🚀 Features

- **Dark-First Modern Aesthetic**: Built with CSS custom properties (variables), high-contrast indigo and cyan accents, and frosted glass (glassmorphism) cards.
- **Theme Switcher**: Instant Dark / Light mode toggle with `localStorage` persistence and system preference detection.
- **Responsive Navigation**: Floating glass sticky top navbar with active link indicator and auto-collapsing mobile drawer.
- **Career Timeline**: Vertical interactive timeline detailing work experience, key achievements, and technology tags.
- **Skills Matrix**: Categorized tech stacks (Languages & Frameworks, DevOps & Tooling, Architecture & Agile Workflows).
- **Contact Card**: Integrated email copy-to-clipboard with instant visual feedback and social profile links.
- **Zero-Build GitHub Pages**: Pure static assets (`index.html`, `css/`, `js/`, `assets/`), served directly from root (`/`) of the `main` branch.

## 🛠️ Local Development

To run the site locally:

```bash
# Python 3
python3 -m http.server 8080

# Or Node.js / npx
npx serve .
```

Visit `http://localhost:8080` in your browser.

## 📦 Deploying to GitHub Pages

1. **Add your remote repository** (if not already configured):
   ```bash
   git remote add origin git@github.com:pouyasalimi/pouyasalimi.github.io.git
   # or via HTTPS:
   # git remote add origin https://github.com/pouyasalimi/pouyasalimi.github.io.git
   ```

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: modernize portfolio design and configure for GitHub Pages"
   git branch -M main
   git push -u origin main
   ```

3. **Verify GitHub Pages Setting**:
   - Go to your repository settings on GitHub: `https://github.com/pouyasalimi/pouyasalimi.github.io/settings/pages`
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.