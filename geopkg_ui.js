// geopkg_ui.js
// Martin Pravda
// UI component for manipulating with geopackage format

/* jslint browser*/


import make_ui from "./ui.js";
import geopkg_conn_ui from "./geopkg_conn_ui.js";
import geopkg_table_ui from "./geopkg_table_ui.js";
import geopkg_controls_ui from "./geopkg_controls_ui.js";

const geopkg_ui = make_ui("geopkg-ui", function (element, {
    db,
    on_add,
    on_close
}) {
    let connections;
    let table;
    let controls;
    const shadow = element.attachShadow({mode: "closed"});

    function on_connect({geopackage}) {
        if (table) {
            table.remove();
        }
        const [result] = geopackage.get_feature_tables();

        table = geopkg_table_ui({
            columns: result.columns,
            on_row_click: function (row) {
                const [table_name] = row;
                controls.remove_listeners();
                controls.attach_listeners({
                    on_add: function () {
                        const [feature] = geopackage.get_feature(
                            table_name
                        );

                        on_add(feature);
                    }
                });
            },
            rows: result.values
        });

        shadow.append(table);
    }

    connections = geopkg_conn_ui({
        db,
        on_connect,
        on_remove: function () {
            controls?.remove_listeners();
            table?.remove();
        }
    });

    controls = geopkg_controls_ui({
        on_close
    });

    shadow.append(connections, controls);
});

export default Object.freeze(geopkg_ui);