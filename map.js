import Map from "ol/Map.js";
import Tile from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import View from "ol/View.js";
import {defaults} from 'ol/control/defaults.js'

import make_ui from "./ui.js";
import dom from "./dom.js";

const map_ui = make_ui("ui-map", function (element) {
    let ol_map;

    const shadow = element.attachShadow({mode: "closed"});
    const map_root = dom("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "500px"
        }
    });

    function mount_map() {
        ol_map = new Map({
            controls: defaults({
                attribution: false,
                attributionOptions: false,
                rotate: false,
                rotateOptions: false,
                zoom: false,
                zoomOptions: false,
            }),
            layers: [
                new Tile({
                    source: new OSM()
                })
            ],
            target: map_root,
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        shadow.append(map_root);
    }

    function dispose_map() {
        ol_map.dispose();
    }

    return {
        connect() {
            mount_map();
        },
        disconnect() {
            dispose_map();
        }
    }
});

//demo import demo from "./demo.js";
//demo demo(map_ui());

export default Object.freeze(map_ui);