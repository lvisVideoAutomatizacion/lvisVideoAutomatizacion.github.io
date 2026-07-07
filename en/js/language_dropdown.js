document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-dropdown').forEach((widget) => {
        const toggle = widget.querySelector('.language-dropdown-toggle');
        const menu = widget.querySelector('.language-menu');
        const links = Array.from(menu.querySelectorAll('.language-menu-link'));
        function openMenu() {
            widget.classList.add('language-dropdown--open');
            toggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu(focusToggle) {
            widget.classList.remove('language-dropdown--open');
            toggle.setAttribute('aria-expanded', 'false');
            if (focusToggle) {
                toggle.focus();
            }
        }

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = widget.classList.contains('language-dropdown--open');
            if (isOpen) {
                closeMenu(false);
            } else {
                openMenu();
            }
        });

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMenu();
                links[0].focus();
            }
        });

        links.forEach((link, index) => {
            link.addEventListener('click', () => {
                closeMenu(false);
            });

            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = links[index + 1] || links[0];
                    next.focus();
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = links[index - 1] || links[links.length - 1];
                    prev.focus();
                }
                if (e.key === 'Home') {
                    e.preventDefault();
                    links[0].focus();
                }
                if (e.key === 'End') {
                    e.preventDefault();
                    links[links.length - 1].focus();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeMenu(true);
                }
                if (e.key === 'Tab') {
                    closeMenu(false);
                }
            });
        });

        widget.addEventListener('focusout', (e) => {
            if (!widget.contains(e.relatedTarget)) {
                closeMenu(false);
            }
        });
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.language-dropdown--open').forEach((widget) => {
            if (!widget.contains(e.target)) {
                widget.classList.remove('language-dropdown--open');
                widget.querySelector('.language-dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.language-dropdown--open').forEach((widget) => {
                widget.classList.remove('language-dropdown--open');
                widget.querySelector('.language-dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });
});