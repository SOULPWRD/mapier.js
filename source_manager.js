// source_manager.js
// Martin Pravda
// Source mananger enables to select a map sourcefor further visualization
// and processing

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";
import make_source_xyz from "./source_xyz.js";

const make_source_manager = make_ui("source-manager", function (element, {
    on_close
}) {
    let source_content;
    let sources_container;

    const sources = [
        {
            component: make_source_xyz({
                on_add_source: function () {
                    // add layer to the map
                }
            }),
            image: "",
            name: "XYZ"
        },
        {
            component: dom("div", ["C2"]),
            image: "",
            name: "PostgreSQL"
        }
    ];

    const shadow = element.attachShadow({mode: "closed"});

    const sources_list = sources.map(function (source) {
        return dom("li", [
            dom("input", {
                id: source.name,
                name: "source",
                onchange: function () {
                    source_content.innerHTML = "";
                    source_content.append(source.component);
                },
                type: "radio"
            }),
            dom("label", {
                htmlFor: source.name
            }, [source.name])
        ]);
    });

    source_content = dom("div");
    sources_container = dom("ul", sources_list);

    shadow.append(sources_container, source_content);
});

//demo import demo from "./demo.js";
//demo demo(make_source_manager({on_close: console.log}));

export default Object.freeze(make_source_manager);