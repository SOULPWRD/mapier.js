// sqlite.js
// Martin Pravda

/*jslint browser */

import init_sql from "sql.js";
import utils from "./utils";

const {base64_to_bytes} = utils;

function load_wasm(base64_wasm) {
    const wasm_codearray = base64_to_bytes(base64_wasm);
    const url = URL.createObjectURL(
        new Blob([wasm_codearray], {type: "application/wasm"})
    );

    return function load(callback) {
        init_sql({
            locateFile: () => url
        }).then(function (SQL) {
            return callback(SQL);
        }).catch(function (err) {
            return callback(undefined, err);
        });
    };
}

export default Object.freeze(load_wasm);