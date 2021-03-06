API.writer = (function() {
    "use strict";
    // Status manager
    var status = {
        last: false,
        sinceLastLineBreak: 0,
        nextLineBreak: false
    };

    // Title snippets
    var title = [
        "Los bolivarianos comienzan la quema masiva de iglesias",
        "Grecia vota NO a devolver a cada español 535 euros",
        "El radicalismo chavista se instaura en las urnas",
        "España dice si a la destrucción de la patria"
    ];

    // Subtitle snippets
    var subtitle = [
        "El populismo traerá consigo la destrucción del país y la sistemática desaparición de la libertad",
        "Errejón cobró por trabajar, los datos apuntan a que tiene hasta un teléfono móvil",
        "Alfonso Merlos afirma que está <<hasta la polla>> de Podemos"
    ];

    // Text snippets
    var text = [
        "\"Pablo Iglesias se ha comido otro bebé\" afimaba hoy nuestro experto en política exterior.",
        "Mejor lo malo conocido que lo malo por conocer.",
        "Estos hechos espeluznantes acontecían mientras Tania Sánchez cobraba por trabajar.",
        "El comunismo mató a millones y millones de personas.",
        "Podemos quiere también prohibir la semana santa, los polos de fresa y los palos de selfie.",
        "Wyoming gana dinero trabajando y lo gasta en lo que quiere, a pesar de ser comunista.",
        "Venezuela, ETA, Irán, Corea del Norte, Cuba y Grecia planean la dominación mundial para finales de 2018. El grupo sería liderado por Pablo Iglesias.",
        "Un concejal de la candidatura de unidad popular dimite tras conocerse que tiene sentido del humor y nosotros no toleramos eso. Je suis charlie."
    ];

    // Last text index, used to avoid repetition
    var lastTextIndex;

    // Returns a random number
    function getRandomNumber(length) {
        return Math.floor(Math.random() * length);
    }

    // Returns a title
    function getTitle() {
        return title[getRandomNumber(title.length)];
    }

    // Returns a subtitle
    function getSubtitle() {
        return subtitle[getRandomNumber(subtitle.length)];
    }

    // Returns a text
    function getText() {
        var index = getRandomNumber(text.length);
        if (index === lastTextIndex) {
            return getText();
        }
        lastTextIndex = index;
        return text[index];
    }

    // Sets the next line break number based on a random value between 4 and 9
    function setNextLineBreak() {
        status.nextLineBreak = getRandomNumber(5) + 4;
    }

    // Returns the next piece of the article
    function getNext() {
        if (!status.last) {
            status.last = "title";
            return {
                "type": "title",
                "content": getTitle()
            };
        }
        if (status.last === "title") {
            status.last = "subtitle";
            return {
                "type": "subtitle",
                "content": getSubtitle()
            };
        }
        if (status.last === "subtitle" || status.last === "text") {
            status.last = "text";
            var linebreak = status.sinceLastLineBreak >= status.nextLineBreak;
            if (linebreak) {
                status.sinceLastLineBreak = 0;
            } else {
                status.sinceLastLineBreak++;
            }
            return {
                "type": "text",
                "content": getText(),
                "linebreak": linebreak
            };
        }
    }

    // Initializes the writer API
    function init() {
        setNextLineBreak();
    }

    // Calls the init function
    init();

    // Publish the API
    return {
        getNext: getNext
    };
})();
