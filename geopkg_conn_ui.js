// geopkg_conn_ui.js
// Martin Pravda

/* jslint browser*/

/*global
    FileReader
*/

import make_ui from "./ui.js";
import dom from "./dom.js";
import geopackage from "./geopackage.js";

const geopkg_conn_ui = make_ui("geopkg-conn-ui", function (element, {
    db,
    db_connections = [],
    on_connect,
    on_remove
}) {
    let select_box;
    let connect_button;
    let file_input;
    let new_connection_button;
    let remove_button;

    const shadow = element.attachShadow({mode: "closed"});

    select_box = dom("select", db_connections.map(function ({name}) {
        return dom("option", {
            value: name
        }, [name]);
    }));

    connect_button = dom("button", {
        disabled: db_connections.length < 1,
        onclick: function on_connect_click() {
            const connection = db_connections.find(function (connection) {
                return select_box.value === connection.name;
            });
            on_connect(connection);
        }
    }, ["Connect"]);

// this is a small hack of how to hide this default ugly input element
// therefore 2 buttons are required:
// 1. input file element with a default "display: none;" style
// 2. button element that on click will trigger input file to open a dialog
    file_input = dom("input", {
        onchange: function on_new_click(event) {
            const reader = new FileReader();
            const [file] = event.target.files;

            if (file === undefined) {
                return;
            }

            let option = Array.from(select_box.options).find(function (option) {
                return option.value === file.name;
            });

            reader.onload = function reader_onload(e) {
                const buffer = e.target.result;
                const uint_8_array = new Uint8Array(buffer);
                db_connections.push({
                    geopackage: geopackage({db: db.sql(uint_8_array)}),
                    name: file.name
                });
            };

            reader.onerror = function () {
// if error occurs remove the option from the list as a fallback functionality
                option?.remove();
            };
            reader.readAsArrayBuffer(file);
// it may happen that the user selects the same file from the file system
// then instead of adding the same file name into the selectbox
// simply mark the existing option as selected
            if (option) {
                option.selected = true;
                return;
            }

            option = dom("option", {
                selected: true,
                value: file.name
            }, [file.name]);

            select_box.append(option);
            remove_button.disabled = false;
            connect_button.disabled = false;
        },
        style: {
            display: "none"
        },
        type: "file"
    });

    new_connection_button = dom("button", {
        onclick: function () {
            file_input.click();
        }
    }, ["New connection"]);

    remove_button = dom("button", {
        disabled: select_box.options.length < 1,
        onclick: function on_remove_click() {
            const option = Array.from(
                select_box.options
            ).find(function (option) {
                return option.value === select_box.value;
            });

            db_connections = db_connections.filter(function ({name}) {
                return name !== select_box.value;
            });

// do a proper clean so the input file onchange event is triggered even
// when the same file has been selected
            file_input.value = "";
            option.remove();

// as long as there's no connection in the list
// make connect and remove button disabled
            if (db_connections.length < 1) {
                remove_button.disabled = true;
                connect_button.disabled = true;
            }

            on_remove();
        }
    }, ["Remove"]);


    shadow.append(
        select_box,
        connect_button,
        file_input,
        new_connection_button,
        remove_button
    );
});

//demo import demo from "./demo.js";
//demo demo(geopkg_conn_ui({
//demo     db: {
//demo         sql: function (value) {
//demo             console.log(value);
//demo         }
//demo     },
//demo     db_connections: [],
//demo     on_connect: function (value) {
//demo         console.log(value);
//demo     },
//demo     on_remove: function () {
//demo         console.log("removed");
//demo     }
//demo }));

export default Object.freeze(geopkg_conn_ui);