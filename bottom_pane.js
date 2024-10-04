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

    function update_coords(event) {
        const [x, y] = event.coordinate;
        coords_ui.update_coordinates(x, y);
    }

    map.on("pointermove", update_coords);

    shadow.append(coords_ui);

    return {
        disconnect() {
            map.un("pointermove", update_coords);
        }
    }
});

export default Object.freeze(make_bottom_pane);
