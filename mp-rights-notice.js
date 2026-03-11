(function () {
    'use strict';

    var ACCEPTED_KEY = 'mp-rights-accepted';

    if (localStorage.getItem(ACCEPTED_KEY) === '1') return;

    function show() {
        var overlay = document.createElement('div');
        overlay.className = 'mp-rights-overlay';
        overlay.innerHTML =
            '<div class="mp-rights-card">' +
                '<img class="mp-rights-icon" src="/icon/Website icon/Websiteicon.png" alt="MP">' +
                '<h2 class="mp-rights-title">All Rights Reserved</h2>' +
                '<p class="mp-rights-dev">Michael Papismedov &mdash; MP</p>' +
                '<hr class="mp-rights-divider">' +
                '<p class="mp-rights-text">' +
                    'This website and all its content, design, code, and assets ' +
                    'are the intellectual property of the developer. ' +
                    'Unauthorized reproduction, distribution, or use of any part ' +
                    'of this site is strictly prohibited.' +
                '</p>' +
                '<p class="mp-rights-text">' +
                    'By continuing, you acknowledge and accept these terms.' +
                '</p>' +
                '<p class="mp-rights-copy">&copy; ' + new Date().getFullYear() +
                    ' Michael Papismedov &mdash; MP. All rights reserved.</p>' +
                '<button class="mp-rights-btn" type="button">' +
                    '\u2714  Accept &amp; Continue' +
                '</button>' +
            '</div>';

        var btn = overlay.querySelector('.mp-rights-btn');
        btn.addEventListener('click', function () {
            localStorage.setItem(ACCEPTED_KEY, '1');
            overlay.classList.add('mp-hide');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 450);
        });

        document.body.appendChild(overlay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', show);
    } else {
        show();
    }
})();
