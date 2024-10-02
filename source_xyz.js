// source_xyz.js
// Martin Pravda
// Main XYZ Source view. User can interactively select from the predefined
// sources or define a custom XYZ source

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";
import make_details_xyz from "./details_xyz.js";

const make_source_xyz = make_ui("source-xyz", function (element, {
    on_add_source
}) {
    let source_select;
    let source_details;

    const sources_list = [
// make empty option first
        {
            max_zoom_level: 0,
            min_zoom_level: 0,
            name: "Custom",
            url: ""
        },
        {
            max_zoom_level: 19,
            min_zoom_level: 0,
            name: "OpenStreetMap",
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
        {
            max_zoom_level: 15,
            min_zoom_level: 0,
            name: "MapZen",
            url: "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
        }
    ];

    const shadow = element.attachShadow({mode: "closed"});

    source_select = dom("select", {
        onchange: function (event) {
            const source = sources_list.find(function (source) {
                return (
                    source.name === event.target.value
                );
            });

            (
                source.name === "Custom"
                ? source_details.clear_details()
                : source_details.update_details(source)
            );
        }
    }, sources_list.map(function (source) {
        return dom("option", {
            value: source.name
        }, [source.name]);
    }));

    source_details = make_details_xyz({
        on_add_source,
        on_save_source: function on_save_source(source) {
            source_select.append(dom("option", {
                selected: true,
                value: source.name
            }, [source.name]));
            sources_list.push(source);
        }
    });

    shadow.append(source_select, source_details);
});

//demo import demo from "./demo.js";
//demo demo(make_source_xyz({
//demo     on_add_source: function (source) {
//demo         console.log(source);
//demo     }
//demo }));

export default Object.freeze(make_source_xyz);