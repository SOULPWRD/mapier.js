// map_ui.js
// Martin Pravda

/*jslint */

import Map from "ol/Map.js";
import View from "ol/View.js";
import {defaults} from "ol/control/defaults.js";

import make_ui from "./ui.js";
import dom from "./dom.js";

const map_ui = make_ui("map-ui", function (element) {
    const ol_map = new Map({
        controls: defaults({
            attribution: false,
            attributionOptions: false,
            rotate: false,
            rotateOptions: false,
            zoom: false,
            zoomOptions: false
        }),
        view: new View({
            center: [0, 0],
            zoom: 2
        })
    });

    const shadow = element.attachShadow({mode: "closed"});
    const map_root = dom("div", {
        style: {
            height: "500px",
            position: "relative",
            width: "100%"
        }
    });

    function get_map() {
        return ol_map;
    }

    function dispose_map() {
        ol_map.dispose();
    }

    element.get_map = get_map;
    shadow.append(map_root);

    return {
        connect() {
            ol_map.setTarget(map_root);
        },
        disconnect() {
            dispose_map();
        }
    };
});

//demo import demo from "./demo.js";
//demo demo(map_ui());

export default Object.freeze(map_ui);