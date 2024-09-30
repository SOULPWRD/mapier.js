// scale.js
// Martin Pravda
// Scale UI component for selecting and changing map scale

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const default_scales = [
    500,
    1000,
    2500,
    5000,
    10000,
    20000,
    50000,
    100000,
    250000,
    1000000
];

const scale_rx = /^[1:]?[:.,\-?"'\\]*(\d+)/g;

const scale_ui = make_ui("map-scale", function (element, {
    on_scale_changed,
    scales = default_scales
}) {

    const shadow = element.attachShadow({mode: "closed"});

    function parse_scale(scale) {
       const [ignore, scale_nr] = scale.split(":");
       return Number(scale_nr);
    }

    function scalify(scale_nr) {
        return `1:${scale_nr}`;
    }

    function sanitize_scale(scale) {
        if (scale_rx.test(scale) === false) {
            return select_element.value;
        }

        return scale.replace(scale_rx, function (ignore, scale_group) {
            return scalify(scale_group);
        });
    }

    const scale_element = dom("input", {
        onchange: function on_change(event) {
            event.preventDefault();
            const value = event.target.value?.trim();
            const scale = sanitize_scale(value);
            event.target.value = scale;

// since value is a string we need to cast it to the number type
            on_scale_changed(parse_scale(scale));
        },
        type: "text"
    });

    const select_element = dom("select", {
        onchange: function on_select_change(event) {
            scale_element.value = event.target.value;
            on_scale_changed(parse_scale(scale_element.value));
        }
    }, scales.map(function (scale) {
        return dom("option", [scalify(scale)]);
    }));



    shadow.append(scale_element, select_element);
});

//demo import demo from "./demo.js";

//demo demo(scale_ui({
//demo     on_scale_changed: function (scale) {
//demo         console.log(scale);
//demo     }
//demo }));


