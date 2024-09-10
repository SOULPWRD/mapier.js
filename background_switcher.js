// background_switcher.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

const background_switcher = make_ui(
    "background-switcher",
    function (element, props) {
        const {
            title,
            layers
        } = props;

        const shadow = element.attachShadow({mode: "closed"});

        function update_map() {
            // todo
            // update map
        }

        const background_layer = function ({
            checked,
            title,
        }) {
            return dom("li", [
                dom("input", {
                    id: title,
                    checked,
                    name: "background",
                    onclick: update_map,
                    type: "radio"
                }),
                dom("label", {
                    htmlFor: title
                }, title)
            ]);
        }
        
        const backgrounds = layers.map(function ({
            title,
            checked
        }) {
            return background_layer({
                checked,
                title
            });
        });

        const switcher = dom("div", [
            dom("h2", title),
            dom("ul", {
                style: {
                    "list-style-type": "none"
                }
            }, backgrounds)
        ]);

        shadow.append(switcher);
    }
);

//demo import demo from "./demo.js";
//demo demo(background_switcher({
//demo     title: "Background",
//demo     layers: [
//demo         {
//demo             title: "OSM",
//demo             checked: true
//demo         },
//demo         {
//demo             title: "Forest map",
//demo             checked: false
//demo         }
//demo     ]
//demo }));

export default Object.freeze(background_switcher);