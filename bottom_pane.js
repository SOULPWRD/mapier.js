// bottom_pane.js
// Martin Pravda
// Bottom panel for coordinats and scale

/*jslint */

import make_ui from "./ui.js";
import make_coordinates from "./coordinates.js";

const make_bottom_pane = make_ui("map-bottom-pane", function (element, {
    map
}) {

    const shadow = element.attachShadow({mode: "closed"});
    const view = map.getView();
    const [x, y] = view.getCenter();

    const coords_ui = make_coordinates({
        coords: {x, y},
        on_coords_update(x, y) {
            view.setCenter([x, y]);
        }
    });


    map.on("moveend", function on_move_end() {
        const [x, y] = view.getCenter();
        coords_ui.update_coordinates(x, y);
    });

    map.un("moveend", function remove_move_end() {
        coords_ui.clear_coordinates();
    });

    shadow.append(coords_ui);
});

export default Object.freeze(make_bottom_pane);
