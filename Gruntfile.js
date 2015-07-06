"use strict";
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        clean: {
            output: {
                src: ["output/"]
            },
            script: {
                src: ["src/js/script.js"]
            },
            html: {
                src: ["src/index.html"]
            }
        },
        concat: {
            script: {
                src: [
                    "src/js/main.js",
                    "src/js/modules/*.js"
                ],
                dest: "src/js/script.js"
            }
        },
        uglify: {
            script: {
                src: "src/js/script.js",
                dest: "src/js/script.js"
            }
        },
        copy: {
            resources: {
                expand: true,
                cwd: "src/resources/",
                src: "**",
                dest: "output/resources/"
            }
        },
        exec: {
            vulcanize: {
                command: "vulcanize -p \"src/\" code.html --inline-script --inline-css > output/index.html"
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-exec");

    // Default task.
    grunt.registerTask("default", ["build"]);

    grunt.registerTask("build", [
        "clean:output",
        "concat:script",
        "uglify:script",
        "copy:resources",
        "exec:vulcanize",
        "clean:html",
        "clean:script"
    ]);
};
