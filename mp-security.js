(function () {
    'use strict';

    /**
     * Escapes HTML entities to prevent XSS when inserting user data into the DOM.
     */
    window.mpSanitize = function (str) {
        if (typeof str !== 'string') return '';
        var el = document.createElement('div');
        el.textContent = str;
        return el.innerHTML;
    };

    /**
     * Validates an email string.
     */
    window.mpValidateEmail = function (email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    };

    /**
     * Validates password strength:
     * 8+ chars, upper, lower, digit, special character.
     */
    window.mpValidatePassword = function (pw) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pw);
    };

    document.addEventListener('DOMContentLoaded', function () {

        /* --- Trim whitespace on text/email/tel inputs --- */
        var inputs = document.querySelectorAll(
            'input[type="text"], input[type="email"], input[type="tel"], textarea'
        );
        inputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                this.value = this.value.trim();
            });
        });

        /* --- Strip <script> tags from non-password inputs on typing --- */
        var allInputs = document.querySelectorAll('input, textarea');
        allInputs.forEach(function (input) {
            if (input.type === 'password' || input.type === 'submit' ||
                input.type === 'button' || input.type === 'hidden') return;
            input.addEventListener('input', function () {
                if (/<script[\s>]/i.test(this.value)) {
                    this.value = this.value.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
                }
            });
        });

        /* --- Add rel="noopener noreferrer" to all external links --- */
        var links = document.querySelectorAll('a[href^="http"]');
        links.forEach(function (link) {
            var rel = link.getAttribute('rel') || '';
            if (rel.indexOf('noopener') === -1) {
                link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
            }
        });

        /* --- Disable form autocompletion for password fields --- */
        var pwFields = document.querySelectorAll('input[type="password"]');
        pwFields.forEach(function (pw) {
            pw.setAttribute('autocomplete', 'new-password');
        });
    });
})();
