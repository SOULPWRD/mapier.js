// source_manager.js
// Martin Pravda
// Source mananger enables to select a map sourcefor further visualization
// and processing

/*jslint browser */

import Tile_layer from "ol/layer/Tile.js";
import XYZ_source from "ol/source/XYZ.js";
import make_ui from "./ui.js";
import dom from "./dom.js";
import source_xyz_ui from "./source_xyz_ui.js";

const source_manager_ui = make_ui("source-manager-ui", function (element, {
    map
}) {
    let source_content;
    let sources_container;

    const sources = [
        {
            component: source_xyz_ui({
                on_add_source: function (source) {
                    const layer = new Tile_layer({
                        source: new XYZ_source({
                            url: source.url,
                            minZoom: source.min_zoom_level,
                            maxZoom: source.max_zoom_level
                        })
                    });
                    map.addLayer(layer);
                }
            }),
            image: "",
            name: "XYZ"
        },
        {
            component: dom("div", ["C2"]),
            image: "",
            name: "PostgreSQL"
        }
    ];

    const shadow = element.attachShadow({mode: "closed"});

    const sources_list = sources.map(function (source) {
        return dom("li", [
            dom("input", {
                id: source.name,
                name: "source",
                onchange: function () {
                    source_content.innerHTML = "";
                    source_content.append(source.component);
                },
                type: "radio"
            }),
            dom("label", {
                htmlFor: source.name
            }, [source.name])
        ]);
    });

    source_content = dom("div");
    sources_container = dom("ul", sources_list);

    shadow.append(sources_container, source_content);
});

//demo import demo from "./demo.js";
//demo demo(source_manager_ui({on_close: console.log}));

export default Object.freeze(source_manager_ui);