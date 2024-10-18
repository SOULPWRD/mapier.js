// splite.js
// Martin Pravda

/*jslint browser */

import init_spl from "spl.js";

function load() {
    return function (callback) {
        init_spl().then(function on_load(spl) {
            return callback(spl);
        }).catch(function on_error(error) {
            return callback(undefined, error);
        });
    }
}

export default Object.freeze({load});