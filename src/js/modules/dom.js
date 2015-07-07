API.dom = (function() {
    "use strict";

    // Initializes DOM functionality
    function init() {
        window.addEventListener("keypress", API.document.keyListener);
    }

    /* GETTERS */
    // Get writer target
    function getWriterTarget() {
        return document.getElementById("writer-target");
    }

    // Get blinking image
    function getBlinking() {
        return document.getElementById("blinking");
    }

    // Publish API
    return {
        init: init,
        // Getters
        getWriterTarget: getWriterTarget,
        getBlinking: getBlinking
    };
})();
