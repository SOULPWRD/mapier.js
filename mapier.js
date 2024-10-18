// mapier.js
// Martin Pravda
// Entry point of the app

/*jslint browser */

import app_ui from "./app_ui.js";
import splite from "./splite.js";
import parseq from "./parseq.js";

function init() {

    return parseq.parallel([
        splite.load()
    ])(function ([
        splite
    ], error) {
        if (error) {
            throw error;
        }

        const db = {
            splite
        };

        app_ui({
            db
        }).mount("#root");
    });
}

init();