// source_manager.js
// Martin Pravda
// Source mananger enables to select a map sourcefor further visualization
// and processing

/*jslint browser */

import Tile_layer from "ol/layer/Tile.js";
import XYZ_source from "ol/source/XYZ.js";
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import Feature from "ol/Feature.js";
import {get} from "ol/proj.js";
import make_ui from "./ui.js";
import dom from "./dom.js";
import xyz_ui from "./xyz_ui.js";
import geopkg_ui from "./geopkg_ui.js";
import factories from "./factories.js";

const source_manager_ui = make_ui("source-manager-ui", function (element, {
    db,
    map,
    on_add_source
}) {
    let source_content;
    let sources_container;

    const get_projection = get;

    const sources = [
        {
            component: xyz_ui({
                on_add_source: function (source) {
                    const ol_layer = new Tile_layer({
                        source: new XYZ_source({
                            maxZoom: source.max_zoom_level,
                            minZoom: source.min_zoom_level,
                            projection: source.srs,
                            url: source.url
                        })
                    });

                    map.addLayer(ol_layer);
                    on_add_source({
                        ol_layer,
                        source
                    });
                }
            }),
            image: "",
            name: "XYZ"
        },
        {
            component: geopkg_ui({
                db,
                on_add_source: function (source) {
                    const current_view = map.getView();
                    const current_projection = current_view.getProjection();
                    const ol_layer = new VectorLayer({
                        source: new VectorSource()
                    });
                    const epgs_code = `EPSG:${source.srs}`;
                    const target_projection = get_projection(epgs_code);
                    const ol_features = source.features.map(
                        function (feature) {
                            const geometry = feature[source.geom_column_name];
                            const ol_geometry = factories.get_geometry_factory(
                                geometry.type.toLowerCase()
                            )(geometry.coordinates);

                            ol_geometry.transform(
                                target_projection,
                                current_projection
                            );

                            return new Feature(ol_geometry);
                        }
                    );

                    ol_layer.getSource().addFeatures(ol_features);
                    map.addLayer(ol_layer);

                    on_add_source({
                        ol_layer,
                        source
                    });
                }
            }),
            image: "",
            name: "Geopackage"
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
//demo demo(source_manager_ui({on_close: console.log}));

export default Object.freeze(source_manager_ui);