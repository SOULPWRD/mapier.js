// details_xyz.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const details_xyz_ui = make_ui("details-xyz-ui", function (element, {
    add_disabled = false,
    center = [0, 0],
    delete_disabled = false,
    max_zoom_level = 0,
    min_zoom_level = 0,
    name = "",
    on_add_source,
    on_delete_source,
    on_name_change,
    on_save_source,
    on_url_change,
    save_disabled = false,
    srs = "EPSG:3857",
    url = "",
    zoom = 0
}) {
    let name_input;
    let url_input;
    let min_zoom_input;
    let max_zoom_input;
    let detail_component;
    let add_button;
    let save_button;
    let delete_button;

    const shadow = element.attachShadow({mode: "closed"});

    function get_details() {
        return Object.freeze({
            center,
            max_zoom_level: (
                max_zoom_input.disabled
                ? undefined
                : max_zoom_input?.value
            ),
            min_zoom_level: (
                min_zoom_input.disabled
                ? undefined
                : min_zoom_input?.value
            ),
            name: name_input?.value,
            srs,
            url: url_input?.value,
            zoom
        });
    }

    function update_details(source = {}) {
        name_input.value = source.name ?? name;
        url_input.value = source.url ?? url;
        min_zoom_input.value = source.min_zoom_level ?? min_zoom_level;
        max_zoom_input.value = source.max_zoom_level ?? max_zoom_level;
        zoom = source.zoom ?? zoom;
        srs = source.srs ?? srs;
        center = source.center ?? center;
    }

    function clear_details() {
        name_input.value = "";
        url_input.value = "";
        min_zoom_input.value = 0;
        max_zoom_input.value = 0;
    }

    function disable_element(element) {
        return function (value) {
            element.disabled = value;
        };
    }

    name_input = dom("input", {
        oninput: function (event) {
            event.preventDefault();
            on_name_change(get_details());
        },
        type: "text",
        value: name
    });

    url_input = dom("input", {
        oninput: function (event) {
            event.preventDefault();
            on_url_change(get_details());
        },
        type: "text",
        value: url
    });

    min_zoom_input = dom("input", {
        type: "number",
        value: min_zoom_level
    });

    max_zoom_input = dom("input", {
        type: "number",
        value: max_zoom_level
    });

    add_button = dom("button", {
        disabled: add_disabled,
        onclick: function on_add() {
            on_add_source(get_details());
        }
    }, ["Add"]);

    save_button = dom("button", {
        disabled: save_disabled,
        onclick: function on_save() {
            on_save_source(get_details());
        }
    }, ["Save"]);

    delete_button = dom("button", {
        disabled: delete_disabled,
        onclick: function on_delete() {
            on_delete_source(get_details());
        }
    }, ["Delete"]);

    detail_component = dom("ul", [
        dom("li", [
            dom("label", ["Name"]),
            name_input
        ]),
        dom("li", [
            dom("label", ["URL"]),
            url_input
        ]),
        dom("li", [
            dom("input", {
                checked: true,
                id: "min_zoom",
                onchange: function (event) {
                    min_zoom_input.disabled = event.target.checked === false;
                },
                type: "checkbox"
            }),
            dom("label", {htmlFor: "min_zoom"}, ["Min. Zoom Level"]),
            min_zoom_input
        ]),
        dom("li", [
            dom("input", {
                checked: true,
                id: "max_zoom",
                onchange: function (event) {
                    max_zoom_input.disabled = event.target.checked === false;
                },
                type: "checkbox"
            }),
            dom("label", {htmlFor: "max_zoom"}, ["Max. Zoom Level"]),
            max_zoom_input
        ]),
        dom("li", [
            add_button,
            save_button,
            delete_button
        ])
    ]);

    shadow.append(detail_component);

    element.update_details = update_details;
    element.clear_details = clear_details;
    element.get_details = get_details;
    element.disable_save = disable_element(save_button);
    element.disable_add = disable_element(add_button);
    element.disable_delete = disable_element(delete_button);
});

//demo import demo from "./demo.js";
//demo demo(details_xyz_ui({
//demo     max_zoom_level: 15,
//demo     min_zoom_level: 0,
//demo     name: "Mapzen Global Terrain",
//demo     on_add_source: function (props) {
//demo         console.log(props);
//demo     },
//demo     on_delete_source: function (props) {
//demo         console.log(props);
//demo     },
//demo     on_add_source: function (props) {
//demo         console.log(props);
//demo     },
//demo     url: "https://demos3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
//demo }));

export default Object.freeze(details_xyz_ui);