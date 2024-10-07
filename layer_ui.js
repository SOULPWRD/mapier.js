// layer_ui.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

function render_css() {
    return `
        label:hover {
            cursor: pointer;
        }
    `;
}

const layer_ui = make_ui("layer-ui", function (element, {
    is_checked = false,
    on_layer_removed,
    on_properties_clicked,
    on_visibility_checked,
    title
}) {
    let check_box;
    let label;
    let delete_button;

    const style = dom("style");
    const shadow = element.attachShadow({mode: "closed"});

    style.textContent = render_css();

    check_box = dom("input", {
        checked: is_checked,
        onchange: function (event) {
            on_visibility_checked(event.target.checked);
        },
        type: "checkbox"
    });

    label = dom("label", {
        onclick: function (event) {
            event.preventDefault();
            on_properties_clicked();
        }
    }, [
        title
    ]);

    delete_button = dom("button", {
        onclick: function (event) {
            event.preventDefault();
            on_layer_removed();
        }
    }, [
        "Delete"
    ]);


    shadow.append(style, check_box, label, delete_button);
});

//demo import demo from "./demo.js";
//demo demo(layer_ui({
//demo     is_checked: true,
//demo     on_layer_removed: function () {
//demo         console.log("remove");
//demo     },
//demo     on_properties_clicked: function () {
//demo         console.log("clicked");
//demo     },
//demo     on_visibility_checked: function () {
//demo         console.log("checked");
//demo     },
//demo     title: "MapZen"
//demo }));

export default Object.freeze(layer_ui);