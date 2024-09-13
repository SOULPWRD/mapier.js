// main.js
// Martin Pravda

// The main entry point for the app

/*jslint browser */

import map_ui from "./map.js";
import background_switcher from "./background_switcher.js";
import make_ui from "./ui.js";

const app = make_ui("main-app", function (element) {

    function mount(target) {
        document.querySelector(target).append(element);
    }

    element.append(
        map_ui(),
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
        })
    );

    element.mount = mount;

    return element;
});

app().mount("#root");