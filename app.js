// main.js
// Martin Pravda

// The main entry point for the app

/*jslint browser */

import map_ui from "./map.js";
import bottom_pane_ui from "./bottom_pane.js";
import dialog_ui from "./dialog_ui.js";
import source_manager_ui from "./source_manager_ui.js";
import make_ui from "./ui.js";
import dom from "./dom.js";

const app = make_ui("app-ui", function (element) {
    let dialog;
    let map;
    let bottom_pane;
    let source_manager;
    let source_manager_button;

    function mount(target) {
        document.querySelector(target).append(element);
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
        map: map.get_map()
    });

    source_manager_button = dom("button", {
        onclick: function () {
            dialog.open(source_manager);
        }
    }, ["Source manager"])

    element.append(
        map,
        source_manager_button,
        bottom_pane,
        dialog
    );


    element.mount = mount;

    return element;
});


//demo import demo from "./demo.js";
//demo demo(app());

export default Object.freeze(app);