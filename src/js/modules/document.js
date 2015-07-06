API.document = (function() {
    "use strict";
    // Status manager
    var status = {
        currentText: false,
        currentType: false,
        currentBreak: false,
        lastElementId: 0,
        lastStringIndex: false
    };

    // Element identifier
    var elementIdentifier = "magic-writer-element-";

    // Listens to keydown
    function keyListener() {
        write();
    }

    // Writes a piece of text
    function write() {
        if (!status.currentText) {
            getNewText();
            renderNewElement();
        }
        writePiece();
    }

    // Writes a new piece of text
    function writePiece() {
        var el = getCurrentElement();
        var letters = 3;
        var start = status.lastStringIndex;
        var finish = status.lastStringIndex + letters >= status.currentText.length;
        var end = finish ? status.currentText.length : status.lastStringIndex + letters;
        var piece = status.currentText.substring(start, end);
        console.log("START: " + start + ", END: " + end + ", PIECE: " + piece);
        el.textContent = el.textContent + piece;
        status.lastStringIndex = end;
        if (finish && status.currentType === "text") {
            el.textContent = el.textContent + " ";
        }
        if (finish) {
            status.lastStringIndex = 0;
            if (status.currentBreak || status.currentType === "title" || status.currentType === "subtitle") {
                el.parentNode.appendChild(document.createElement("br"));
                el.parentNode.appendChild(document.createElement("br"));
            }
            status.currentText = status.currentType = status.currentBreak = false;
        }
    }

    // Gets a new text
    function getNewText() {
        var next = API.writer.getNext();
        status.currentText = next.content;
        status.currentType = next.type;
        status.currentBreak = next.linebreak;
    }

    // Renders a new element
    function renderNewElement() {
        var target = API.dom.getWriterTarget();
        var el;
        if (status.currentType === "title") {
            el = document.createElement("span");
            el.classList.add("title");
        } else if (status.currentType === "subtitle") {
            el = document.createElement("span");
            el.classList.add("subtitle");
        } else if (status.currentType === "text") {
            el = document.createElement("span");
            el.classList.add("text");
        }
        status.lastElementId++;
        el.id = elementIdentifier + status.lastElementId;
        target.appendChild(el);
    }

    // Returns the current element
    function getCurrentElement() {
        console.info(elementIdentifier + status.lastElementId);
        return document.getElementById(elementIdentifier + status.lastElementId);
    }

    // Publish the API
    return {
        keyListener: keyListener
    };
})();
