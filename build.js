// build.js
// Martin Pravda

/*jslint node */

import {resolve} from "node:path";
import {writeFile} from "node:fs";
import {build} from "vite";
import create_html from "./document.js";
import parseq from "./parseq.js";
import create_logger from './logger.js';

const logger = create_logger({type: "build"});

function entrify(path) {
    return resolve(
        import.meta.dirname,
        path
    );
}

function create_bundle(input_file, environment) {
    return function (callback) {
        return build({
            build: {
                minify: (
                    environment === "production"
                ),
                rollupOptions: {
                    input: input_file,
                    output: {
                        format: "module",
                        name: "mapier"
                    }
                },
                write: false
            }
        }).then(function ({output}) {
            return callback(output[0].code);
        }).catch(function (err) {
            return callback(undefined, err);
        });
    };
}

function write_document(output_path) {
    return function (callback, app_code) {
        const document = create_html({
            app_code,
            state: JSON.stringify({})
        });

        writeFile(output_path, document, function (err) {
            if (err) {
                return callback(undefined, err);
            }

            return callback({
                preview: document
            });
        });
    };
}

function log_result(value, reason) {
    if (reason !== undefined) {
        logger.error(reason);
        return;
    }

    return logger.info("Quine has been successfully build");
}

function build_html(input, output, environment = "development") {
    return parseq.sequence([
        create_bundle(input, environment),
        write_document(output)
    ])(log_result);
}

build_html(
    entrify("./main.js"),
    entrify("./mapier.html")
);