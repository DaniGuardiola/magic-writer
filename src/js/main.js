(function() {
    "use strict";

    // Declare API namespace
    window.API = {};

    // Initialize the app
    function init() {
        // Init DOM
        API.dom.init();
    }

    window.addEventListener("load", init);
})();
