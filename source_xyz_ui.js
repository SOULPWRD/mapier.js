// source_xyz.js
// Martin Pravda
// Main XYZ Source view. User can interactively select from the predefined
// sources or define a custom XYZ source

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";
import details_xyz_ui from "./details_xyz_ui.js";

const source_xyz_ui = make_ui("source-xyz-ui", function (element, {
    on_add_source,
    sources_list = [
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
    ]
}) {
    let source_select;
    let source_details;

    const shadow = element.attachShadow({mode: "closed"});

    function on_input_change({name, url}) {
// default buttons state
        source_details.disable_add(false);
        source_details.disable_save(false);
        source_details.disable_delete(false);

        if (!url || !name) {
            source_details.disable_add(true);
            source_details.disable_save(true);
            source_details.disable_delete(true);
            return;
        }

        if (sources_list.some(function (source) {
            return source.name === name;
        }) === true) {
            source_details.disable_save(true);
            return;
        } else {
            source_details.disable_delete(true);
            return;
        }
    }

    function get_sources_list() {
        return sources_list;
    }

    source_select = dom("select", {
        onchange: function (event) {
            const source = sources_list.find(function (source) {
                return (
                    source.name === event.target.value
                );
            });

            if (source.name === "Custom") {
                source_details.clear_details();
                source_details.disable_delete(true);
                source_details.disable_add(true);
                source_details.disable_save(true);
                return;
            }

            source_details.update_details(source);
            source_details.disable_add(false);
            source_details.disable_delete(false);
            source_details.disable_save(true);
        }
    }, sources_list.map(function (source) {
        return dom("option", {
            value: source.name
        }, [source.name]);
    }));

    source_details = details_xyz_ui({
        delete_disabled: true,
        on_add_source,
        on_delete_source: function on_delete_source(source) {
            sources_list = sources_list.filter(function ({name}) {
                return name !== source.name;
            });

            const option = Array.from(
                source_select.options
            ).find(function (option) {
                return source.name === option.value;
            });
            option.remove();

            source_details.clear_details();
            source_details.disable_delete(true);
            source_details.disable_add(true);
            source_details.disable_save(true);
        },
        on_name_change: on_input_change,
        on_save_source: function on_save_source(source) {
            source_select.append(dom("option", {
                selected: true,
                value: source.name
            }, [source.name]));
            sources_list.push(source);
        },
        on_url_change: on_input_change
    });

    shadow.append(source_select, source_details);

    element.get_sources_list = get_sources_list;
});

//demo import demo from "./demo.js";
//demo demo(source_xyz_ui({
//demo     on_add_source: function (source) {
//demo         console.log(source);
//demo     }
//demo }));

export default Object.freeze(source_xyz_ui);