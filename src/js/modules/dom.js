API.dom = (function() {
    "use strict";

    // Initializes DOM functionality
    function init() {
        window.addEventListener("keydown", API.document.keyListener);
    }

    /* GETTERS */
    // Get writer target
    function getWriterTarget() {
        return document.getElementById("writer-target");
    }

    // Publish API
    return {
        init: init,
        // Getters
        getWriterTarget: getWriterTarget
    };
})();
