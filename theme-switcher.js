(function () {
    'use strict';

    var STORAGE_KEY = 'mp-theme';
    var root = document.documentElement;

    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
        root.setAttribute('data-theme', saved);
    }

    function getTheme() {
        return root.getAttribute('data-theme') || '';
    }

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateIcon();
    }

    var btn;

    function updateIcon() {
        if (!btn) return;
        var theme = getTheme();
        if (theme === 'light') {
            btn.textContent = '\u{1F319}';
            btn.setAttribute('title', 'Dark Mode \u2014 \u05DE\u05E6\u05D1 \u05DB\u05D4\u05D4');
            btn.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            btn.textContent = '\u2600\uFE0F';
            btn.setAttribute('title', 'Light Mode \u2014 \u05DE\u05E6\u05D1 \u05D1\u05D4\u05D9\u05E8');
            btn.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    function toggle() {
        var current = getTheme();
        setTheme(current === 'light' ? 'dark' : 'light');
    }

    function createToggle() {
        btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.type = 'button';
        updateIcon();
        btn.addEventListener('click', toggle);
        document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggle);
    } else {
        createToggle();
    }
})();
