// ==========================================================================
// Pouya Salimi — Portfolio interactions (no framework dependencies)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;

    // ----------------------------------------------------------------------
    // 1. Dark / Light theme toggle & persistence
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const iconSun = document.getElementById('themeIconSun');
    const iconMoon = document.getElementById('themeIconMoon');

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const isDark = theme === 'dark';
        if (iconSun) iconSun.classList.toggle('hidden', !isDark);
        if (iconMoon) iconMoon.classList.toggle('hidden', isDark);
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    applyTheme(html.getAttribute('data-theme') || 'dark');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // ----------------------------------------------------------------------
    // 2. Mobile menu
    // ----------------------------------------------------------------------
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', () => {
            const willOpen = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', !willOpen);
            menuToggleBtn.setAttribute('aria-expanded', String(willOpen));
        });

        mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. Scrollspy — active nav link highlighting
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let currentId = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach((section) => {
            const top = section.offsetTop;
            if (scrollPosition >= top && scrollPosition < top + section.offsetHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('text-ink', isActive);
            link.classList.toggle('bg-elevated', isActive);
            link.classList.toggle('text-ink-dim', !isActive);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ----------------------------------------------------------------------
    // 4. Copy email to clipboard
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailToCopy = 'pouya@salimi.info';
    const copyLabel = copyEmailBtn ? copyEmailBtn.querySelector('.copy-label') : null;

    function showCopied() {
        if (!copyLabel) return;
        const icon = copyEmailBtn.querySelector('.copy-icon');
        if (icon) {
            icon.outerHTML =
                '<svg class="copy-icon h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
        }
        copyLabel.textContent = 'Copied!';
        setTimeout(() => {
            copyLabel.textContent = 'Copy';
            const check = copyEmailBtn.querySelector('.copy-icon');
            if (check) {
                check.outerHTML =
                    '<svg class="copy-icon h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
            }
        }, 2200);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailToCopy);
                showCopied();
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopied();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 5. Footer year
    // ----------------------------------------------------------------------
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
