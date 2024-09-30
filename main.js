// main.js
// Martin Pravda

// The main entry point for the app

/*jslint browser */

import make_map_ui from "./map.js";
import make_bottom_pane from "./bottom_pane.js";
import background_switcher from "./background_switcher.js";
import make_ui from "./ui.js";

const app = make_ui("main-app", function (element) {

    function mount(target) {
        document.querySelector(target).append(element);
    }

    const map_ui = make_map_ui()
    const bottom_pane_ui = make_bottom_pane({
        map: map_ui.get_map()
    });

    element.append(
        map_ui,
        background_switcher({
            layers: [
                {
                    checked: true,
                    id: "osm",
                    title: "OSM"
                },
                {
                    checked: false,
                    id: "forest",
                    title: "Forest map"
                }
            ],
            title: "Backgrounds"
        }),
        bottom_pane_ui
    );

    element.mount = mount;

    return element;
});

app().mount("#root");