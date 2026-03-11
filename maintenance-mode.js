(function () {
    'use strict';

    /* ===================================================
       MAINTENANCE MODE — change to false to reopen site
       =================================================== */
    var MAINTENANCE_ON = true;

    var maintenancePage = '/maintenance.html';

    var isMaintenancePage = window.location.pathname.indexOf('maintenance.html') !== -1;

    if (MAINTENANCE_ON && !isMaintenancePage) {
        window.location.replace(maintenancePage);
        return;
    }
})();
