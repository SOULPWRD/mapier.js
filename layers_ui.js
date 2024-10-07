// layers_ui.js
// Martin Pravda

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";
import layer_ui from "./layer_ui.js";

const layers_ui = make_ui("layers-ui", function (element, {
    layers = [],
    map
}) {
    // let layer_controls;
    let layer_switcher;

    const shadow = element.attachShadow({mode: "closed"});

    function add_layer(source, ol_layer) {
        let layer_item;

        const layer = layer_ui({
            is_checked: true,
            on_layer_removed: function () {
                map.removeLayer(ol_layer);
                layer_item.remove();
            },
            on_properties_clicked: function () {},
            on_visibility_checked: function (checked) {
                ol_layer.setVisible(checked);
            },
            title: source.name
        });

        layer_item = dom("li", [layer]);
        layer_switcher.append(layer_item);
    }

    layer_switcher = dom("ul");
    layers.forEach(add_layer);

    shadow.append(layer_switcher);

    element.add_layer = add_layer;
});

export default Object.freeze(layers_ui);