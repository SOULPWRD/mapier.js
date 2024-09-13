// state.js
// Martin Pravda

// Initial State of the app

// This is a single source of truth for the state of the app

/* jslint browser */

const state = {
    components: [
        {
            id: "background_switcher",
            map_refs: [
                "background_switcher_map_1",
                "background_switcher_map_2"
            ]
        },
        {
            id: "map",
            map_refs: ["main_map"]
        }
    ],
    controls: [
        {   
            id: "map_controls_1",
            attribution: false,
            attributionOptions: false,
            rotate: false,
            rotateOptions: false,
            zoom: false,
            zoomOptions: false
        }
    ],
    layers: [
        {
            id: "osm",
            source: {
                type: "osm"
            },
            type: "tile_layer"
        },
        {
            id: "thunder_forest",
            source: {
                type: "image_tile",
                url: "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0e6fc415256d4fbb9b5166a718591d71"
            },
            type: "tile_layer"
        }
    ],
    maps: [
        {
            active_layer: "osm",
            active_view: "map",
            control_refs: ["map_controls_1"],
            id: "main_map",
            layer_refs: ["osm", "thunder_forest"],
            view_refs: ["map"]
        },
        {
            active_layer: "osm",
            active_view: "map",
            control_refs: ["map_controls_1"],
            id: "background_switcher_map_1",
            layer_refs: ["osm"],
            view_refs: ["map"]
        },
        {
            active_view: "map",
            active_layer: "thunder_forest",
            control_refs: ["map_controls_1"],
            id: "background_switcher_map_2",
            layer_refs: ["thunder_forest"],
            view_refs: ["map"]
        }
    ],
    views: [
        {
            center: [0, 0],
            id: "map",
            zoom: 2
        }
    ]
};

export default Object.freeze(state);