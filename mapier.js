// mapier.js
// Martin Pravda
// Entry point of the app

/*jslint browser */

import app_ui from "./app_ui.js";
import splite from "./splite.js";
import parseq from "./parseq.js";

function init() {
    const root_element = document.querySelector("#root");
    root_element.innerHTML = "Loading...";

    return parseq.parallel([
        splite.load()
    ])(function ([
        splite
    ], error) {
        if (error) {
            throw error;
        }
        
        root_element.innerHTML = "";

        const db = {
            splite
        };

        app_ui({
            db
        }).mount(root_element);
    });
}

init();