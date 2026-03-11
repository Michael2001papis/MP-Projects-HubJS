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
        var els = document.querySelectorAll('a.back-link, a.home-button');
        els.forEach(function (el) { el.remove(); });

        var backBtns = document.querySelectorAll('.text-center.mt-4.mb-4');
        backBtns.forEach(function (el) {
            var link = el.querySelector('a[href*="index.html"]');
            if (link) el.remove();
        });

        var footers = document.querySelectorAll('footer:not(.mp-footer)');
        footers.forEach(function (footer) {
            var hasGameControls = footer.querySelectorAll(
                'button.reset-button, canvas, input[type="range"]'
            ).length > 0;

            if (hasGameControls) {
                var children = Array.from(footer.childNodes);
                children.forEach(function (child) {
                    if (child.nodeType === 1 && child.textContent &&
                        child.textContent.indexOf('Michael Papismedov') !== -1) {
                        child.remove();
                    }
                });
                var homeLinks = footer.querySelectorAll('a.home-button, a.back-link, a[href*="index.html"]');
                homeLinks.forEach(function (el) { el.remove(); });
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
