// ==========================================================================
// Pouya Salimi - Modern Portfolio Interactive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dark / Light Theme Toggle & Persistence
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Detect saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeIcon.className = 'fas fa-moon';
                themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    setTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }

    // ----------------------------------------------------------------------
    // 2. Active Navbar Link Highlighting (IntersectionObserver)
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Auto-Collapse
    // ----------------------------------------------------------------------
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler-custom');

    if (navbarCollapse && navbarToggler) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // Close on clicking outside mobile menu
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show') && !navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. Copy Email to Clipboard
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailToCopy = 'pouya@salimi.info';

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailToCopy);
                const originalContent = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyEmailBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalContent;
                    copyEmailBtn.style.background = '';
                }, 2200);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2200);
            }
        });
    }
});
