// source_manager.js
// Martin Pravda
// Source mananger enables to select a map source for further visualization
// and processing

/*jslint browser */

import Tile_layer from "ol/layer/Tile.js";
import XYZ_source from "ol/source/XYZ.js";
import Vector_tile_layer from "ol/layer/VectorTile.js";
import Vector_tile_source from "ol/source/VectorTile.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Projection from "ol/proj/Projection.js";
import geojsonvt from "geojson-vt";
import make_ui from "./ui.js";
import dom from "./dom.js";
import xyz_ui from "./xyz_ui.js";
import geopkg_ui from "./geopkg_ui.js";
import geojson from "./geojson.js";

const source_manager_ui = make_ui("source-manager-ui", function (element, {
    map,
    modules,
    on_add_source
}) {
    let source_content;
    let sources_container;

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
                modules,
                on_add_source: function (source) {
                    const {features} = source;
                    const [feature] = features;

                    const data = geojson.transform_geojson(
                        feature.geometry,
                        `EPSG:${source.srs}`,
                        "EPSG:4326"
                    );
                    const tile_index = geojsonvt(data, {
                        debug: 1,
                        extent: 4096
                    });
                    const format = new GeoJSON({
                        dataProjection: new Projection({
                            code: "TILE_PIXELS",
                            extent: [0, 0, 4096, 4096],
                            units: "tile-pixels"
                        })
                    });
                    const ol_layer = new Vector_tile_layer();
                    const map_view = map.getView();

                    const vector_source = new Vector_tile_source({
                        tileLoadFunction: function (tile, url) {
                            const tile_coord = JSON.parse(url);
                            const tile_data = tile_index.getTile(...tile_coord);
                            const geojson_data = JSON.stringify({
                                features: (
                                    tile_data
                                    ? tile_data.features
                                    : []
                                ),
                                type: "FeatureCollection"
                            }, geojson.replacer);
                            const feature_projection = map_view.getProjection();
                            const tile_grid = vector_source.getTileGrid();
                            const extent = tile_grid.getTileCoordExtent(
                                tile_coord
                            );

                            const ol_features = format.readFeatures(
                                geojson_data,
                                {
                                    extent,
                                    featureProjection: feature_projection
                                }
                            );

                            tile.setFeatures(ol_features);
                        },
                        tileUrlFunction: function (tile_coord) {
                            return JSON.stringify(tile_coord);
                        }
                    });

                    ol_layer.setSource(vector_source);
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