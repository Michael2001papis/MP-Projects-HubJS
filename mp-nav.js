(function () {
    'use strict';

    var NAV_LINKS = [
        { href: '/index.html', text: '\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA' },
        { href: '/pages/LandingPage/\u05E2\u05DE\u05D5\u05D3\u05E4\u05E8\u05D5\u05D9\u05D9\u05E7\u05D8\u05D9\u05DD.html', text: '\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9 HTML' },
        { href: '/pages/\u05E2\u05DE\u05D5\u05D3\u05DE\u05E2\u05D1\u05E8\u05D9\u05DD\u05DB\u05DC\u05DC\u05D9/index.html', text: '\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9 JS' },
        { href: '/pages/LandingPage/\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8.HTML', text: '\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8' }
    ];

    function buildNavbar() {
        var nav = document.createElement('nav');
        nav.className = 'mp-navbar';
        nav.setAttribute('role', 'navigation');

        var brand = document.createElement('a');
        brand.href = '/index.html';
        brand.className = 'mp-navbar__brand';
        brand.innerHTML =
            '<img class="mp-navbar__icon" src="/icon/Website icon/Websiteicon.png" alt="MP">' +
            '<span class="mp-navbar__title">Projects Hub</span>';

        var toggle = document.createElement('button');
        toggle.className = 'mp-navbar__toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', '\u05EA\u05E4\u05E8\u05D9\u05D8');
        toggle.innerHTML = '<span></span><span></span><span></span>';

        var menu = document.createElement('div');
        menu.className = 'mp-navbar__menu';

        var currentPath = decodeURIComponent(window.location.pathname);

        NAV_LINKS.forEach(function (item) {
            var a = document.createElement('a');
            a.href = item.href;
            a.className = 'mp-navbar__link';
            a.textContent = item.text;
            if (currentPath === item.href ||
                currentPath.endsWith(item.href) ||
                (item.href === '/index.html' && (currentPath === '/' || currentPath.endsWith('/index.html')))) {
                a.classList.add('mp-navbar__link--active');
            }
            menu.appendChild(a);
        });

        toggle.addEventListener('click', function () {
            menu.classList.toggle('mp-navbar__menu--open');
            toggle.classList.toggle('mp-navbar__toggle--active');
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target)) {
                menu.classList.remove('mp-navbar__menu--open');
                toggle.classList.remove('mp-navbar__toggle--active');
            }
        });

        nav.appendChild(brand);
        nav.appendChild(toggle);
        nav.appendChild(menu);

        return nav;
    }

    function cleanOldNav() {
        var remove = function (sel) {
            document.querySelectorAll(sel).forEach(function (el) { el.remove(); });
        };

        remove('a.back-link');
        remove('a.home-button');

        document.querySelectorAll('.text-center.mt-4.mb-4').forEach(function (el) {
            if (el.querySelector('a[href*="index.html"]')) el.remove();
        });

        remove('header:not(.hud):not(.game__header) > nav');
        remove('.top-menu > nav');
        remove('.top-menu > a');
        remove('.header > nav');
        remove('.header > a[target="_blank"]');
        remove('#top-menu');
        remove('.top-nav');
        remove('.header-button');

        remove('.btm-but');
        remove('#bottom-main');

        document.querySelectorAll('header:not(.hud):not(.game__header), .top-menu').forEach(function (el) {
            if (el.className === 'mp-navbar' || el.closest('.mp-navbar')) return;
            if (!el.textContent.trim()) el.remove();
        });

        var footers = document.querySelectorAll('footer:not(.mp-footer)');
        footers.forEach(function (footer) {
            var hasGameControls = footer.querySelectorAll(
                'button.reset-button, canvas, input[type="range"]'
            ).length > 0;

            if (hasGameControls) {
                footer.querySelectorAll('nav, a.home-button, a.back-link').forEach(function (el) { el.remove(); });
                Array.from(footer.childNodes).forEach(function (child) {
                    if (child.nodeType === 1 && child.textContent &&
                        child.textContent.indexOf('Michael Papismedov') !== -1) {
                        child.remove();
                    }
                });
            } else {
                footer.remove();
            }
        });
    }

    function buildFooter() {
        var footer = document.createElement('footer');
        footer.className = 'mp-footer';

        var inner = document.createElement('div');
        inner.className = 'mp-footer__inner';

        var nav = document.createElement('nav');
        nav.className = 'mp-footer__nav';
        NAV_LINKS.forEach(function (item) {
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            nav.appendChild(a);
        });

        var divider = document.createElement('hr');
        divider.className = 'mp-footer__divider';

        var brand = document.createElement('div');
        brand.className = 'mp-footer__brand';
        brand.innerHTML =
            '<img src="/icon/Website icon/Websiteicon.png" alt="MP">' +
            '<span>Michael Papismedov \u2014 MP</span>';

        var copy = document.createElement('p');
        copy.className = 'mp-footer__copy';
        copy.textContent = '\u00A9 ' + new Date().getFullYear() + ' All Rights Reserved';

        inner.appendChild(nav);
        inner.appendChild(divider);
        inner.appendChild(brand);
        inner.appendChild(copy);
        footer.appendChild(inner);

        return footer;
    }

    function init() {
        var navbar = buildNavbar();
        document.body.insertBefore(navbar, document.body.firstChild);

        cleanOldNav();

        var newFooter = buildFooter();
        document.body.appendChild(newFooter);

        document.body.classList.add('mp-has-navbar');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
