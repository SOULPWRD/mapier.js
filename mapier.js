// mapier.js
// Martin Pravda
// Entry point of the app

/*jslint browser */

import app_ui from "./app_ui.js";
import load_wasm from "./sqlite.js";
import parseq from "./parseq.js";

function init() {
    const wasm_root = document.querySelector(
        "[data-app=\"wasm_sql\"]"
    );
    const wasm_map = JSON.parse(wasm_root.innerHTML.trim());

    return parseq.parallel([
        load_wasm(wasm_map.sql)
    ])(function ([SQL], error) {
        if (error) {
            throw error;
        }

        const db = {
            sql: function (data) {
                return new SQL.Database(data);
            }
        };

        app_ui({
            db
        }).mount("#root");
    });
}

init();