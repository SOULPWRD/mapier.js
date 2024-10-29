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

    return parseq.parallel_object({
        splite: splite.load()
    })(function (modules, error) {
        if (error) {
            throw error;
        }
        
        root_element.innerHTML = "";

        app_ui({
            modules
        }).mount(root_element);
    });
}

init();