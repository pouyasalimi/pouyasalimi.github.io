/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS variables (swapped per theme in src/input.css)
        // NOTE: the page-background token is named `page` (not `base`) because
        // `text-base` would otherwise collide with Tailwind's font-size utility.
        page: 'var(--bg)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        ink: 'var(--text)',
        'ink-dim': 'var(--text-dim)',
        'ink-mute': 'var(--text-mute)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        sans: ['Inter', 'Vazirmatn', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Vazirmatn', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Persian / RTL text
        vazir: ['Vazirmatn', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
