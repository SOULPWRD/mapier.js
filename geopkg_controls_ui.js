// geopkg_controls.ui.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";


const geopkg_controls_ui = make_ui("geopkg-controls-ui", function (element, {
    on_close
}) {
    let add_button;
    let close_button;

    const shadow = element.attachShadow({mode: "closed"});

    function attach_listeners({on_add}) {
        add_button.onclick = on_add;
    }

    function remove_listeners() {
        [add_button].forEach(function (button) {
            delete button.onclick;
        });
    }

    add_button = dom("button", [
        "Add"
    ]);

    close_button = dom("button", {
        onclick: function (event) {
            event.preventDefault();
            on_close();
        }
    }, [
        "Close"
    ]);

    shadow.append(add_button, close_button);

    element.attach_listeners = attach_listeners;
    element.remove_listeners = remove_listeners;
});

export default Object.freeze(geopkg_controls_ui);
