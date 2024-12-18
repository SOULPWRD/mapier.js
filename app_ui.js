// main.js
// Martin Pravda

// The main entry point for the app

/*jslint browser */

import map_ui from "./map_ui.js";
import bottom_pane_ui from "./bottom_pane_ui.js";
import dialog_ui from "./dialog_ui.js";
import source_manager_ui from "./source_manager_ui.js";
import layers_ui from "./layers_ui.js";
import make_ui from "./ui.js";
import dom from "./dom.js";
import projection from "./projection.js";

const app_ui = make_ui("app-ui", function (element, {
    modules
}) {
    let dialog;
    let map;
    let bottom_pane;
    let source_manager;
    let source_manager_button;
    let layers;

    function mount(target) {
        projection.register_projections();
        target.append(element);
    }

    map = map_ui();
    bottom_pane = bottom_pane_ui({
        map: map.get_map()
    });
    dialog = dialog_ui({
        on_close() {
            dialog.close();
        },
        visibility: false
    });
    source_manager = source_manager_ui({
        modules,
        map: map.get_map(),
        on_add_source: function on_add_source(source) {
            layers.add_layer(source);
        }
    });
    layers = layers_ui({
        map: map.get_map()
    });

    source_manager_button = dom("button", {
        onclick: function () {
            dialog.open(source_manager);
        }
    }, ["Source manager"]);

    element.append(
        map,
        source_manager_button,
        layers,
        bottom_pane,
        dialog
    );


    element.mount = mount;

    return element;
});


//demo import demo from "./demo.js";
//demo demo(app_ui());

export default Object.freeze(app_ui);