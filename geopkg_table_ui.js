// geopkg_table.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const geopkg_table_ui = make_ui("geopkg-table-ui", function (element, {
    columns,
    on_row_click,
    rows
}) {
    let table;
    let table_rows;
    let table_columns;

    const shadow = element.attachShadow({mode: "closed"});

    table = dom("table");

    table_columns = dom("tr", columns.map(function (column_name) {
        return dom("th", [
            column_name
        ]);
    }));

    table_rows = rows.map(function (row) {
        return dom("tr", {
            onclick: function (e) {
                e.preventDefault();
                on_row_click(row);
            }
        }, row.map(function (value) {
            return dom("td", [value]);
        }));
    });

    table.append(table_columns, ...table_rows);
    shadow.append(table);
});

//demo import demo from "./demo.js";

//demo const columns = ["a", "b", "c"];
//demo const rows = [
//demo     [1, 2, 3],
//demo     [4, 5, 6],
//demo     [7, 8, 9]
//demo ];

//demo demo(geopkg_table_ui({
//demo     columns,
//demo     on_row_click: function () {
//demo         console.log("row clicked");
//demo     },
//demo     rows
//demo }));

export default Object.freeze(geopkg_table_ui);