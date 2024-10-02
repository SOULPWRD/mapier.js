// details_xyz.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const make_details_xyz = make_ui("details-xyz", function (element, {
    max_zoom_level = 0,
    min_zoom_level = 0,
    name = "",
    on_add_source,
    on_save_source,
    url = ""
}) {
    let name_input;
    let url_input;
    let min_zoom_input;
    let max_zoom_input;
    let detail_component;
    let add_button;
    let save_button;

    const shadow = element.attachShadow({mode: "closed"});

    function get_details() {
        return Object.freeze({
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
            url: url_input?.value
        });
    }

    function update_details(detail = {}) {
        name_input.value = detail.name ?? name;
        url_input.value = detail.url ?? url;
        min_zoom_input.value = detail.min_zoom_level ?? min_zoom_level;
        max_zoom_input.value = detail.max_zoom_level ?? max_zoom_level;
    }

    function clear_details() {
        name_input.value = "";
        url_input.value = "";
        min_zoom_input.value = 0;
        max_zoom_input.value = 0;
    }

    name_input = dom("input", {
        type: "text",
        value: name
    });

    url_input = dom("input", {
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
        onclick: function () {
            on_add_source(get_details());
        }
    }, ["Add"]);

    save_button = dom("button", {
        onclick: function () {
            on_save_source(get_details());
        }
    }, ["Save"]);

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
            save_button
        ])
    ]);

    shadow.append(detail_component);

    element.update_details = update_details;
    element.clear_details = clear_details;
    elememnt.get_details = get_details;
});

//demo import demo from "./demo.js";
//demo demo(make_details_xyz({
//demo     max_zoom_level: 15,
//demo     min_zoom_level: 0,
//demo     name: "Mapzen Global Terrain",
//demo     on_add_source: function (props) {
//demo         console.log(props);
//demo     },
//demo     on_add_source: function (props) {
//demo         console.log(props);
//demo     },
//demo     url: "https://demos3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
//demo }));

export default Object.freeze(make_details_xyz);