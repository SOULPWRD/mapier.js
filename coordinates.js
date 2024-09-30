// coordinates.js
// Martin Pravda
// UI component for tracking and changing map coordinates

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const coordinates_ui = make_ui("map-coordinates", function (element, {
    coords,
    on_coords_update
}) {
    const shadow = element.attachShadow({mode: "closed"});

    const coords_element = dom("input", {
        onchange: function on_change(event) {
            event.preventDefault();
            const value = event.target.value;

            const [x, y] = value.split(",");

            on_coords_update(x?.trim(), y?.trim());
        }
    }, {
        type: "text"
    });

    function update_coordinates(x, y) {
        coords.x = x;
        coords.y = y;

        coords_element.value = `${coords.x}, ${coords.y}`;
    }

    function clear_coordinates() {
        coords_element.value = "";
    }

    shadow.append(coords_element);

    element.update_coordinates = update_coordinates;
    element.clear_coordinates = clear_coordinates;

    return {
        connect() {
            update_coordinates(coords.x, coords.y);
        },
        disconnect() {
            clear_coordinates();
        }
    };
});

//demo import demo from "./demo.js";

//demo const element = coordinates_ui({
//demo     coords: {x: 0, y: 0},
//demo     on_coords_update: function (x, y) {
//demo         console.log(x, y);
//demo     }
//demo });

//demo demo(element);

//demo setTimeout(function () {
//demo     element.update_coordinates(1, 1);
//demo }, 1000);

export default Object.freeze(coordinates_ui);
