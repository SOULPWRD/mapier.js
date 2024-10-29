// geojson.js
// Martin Pravda

/*jslint browser */

import GeoJSON from "ol/format/GeoJSON.js";
import {get} from "ol/proj.js";

// Converts geojson-vt data to GeoJSON
// taken from https://openlayers.org/en/latest/examples/geojson-vt.html
function replacer(ignore, value) {
    if (!value || !value.geometry) {
        return value;
    }

    let type;
    const rawType = value.type;
    let geometry = value.geometry;
    if (rawType === 1) {
        type = "MultiPoint";
        if (geometry.length === 1) {
            type = "Point";
            geometry = geometry[0];
        }
    } else if (rawType === 2) {
        type = "MultiLineString";
        if (geometry.length === 1) {
            type = "LineString";
            geometry = geometry[0];
        }
    } else if (rawType === 3) {
        type = "Polygon";
        if (geometry.length > 1) {
            type = "MultiPolygon";
            geometry = [geometry];
        }
    }

    return {
        "geometry": {
            "coordinates": geometry,
            "type": type
        },
        "properties": value.tags,
        "type": "Feature"
    };
}

function transform_geojson(
    geojson,
    source_projection,
    dest_projection
) {
    const format = new GeoJSON();

    const features = format.readFeatures(geojson, {
        dataProjection: get(source_projection),
        featureProjection: get(dest_projection)
    });

    return format.writeFeaturesObject(features, {
        dataProjection: get(dest_projection),
        featureProjection: get(dest_projection)
    });
}


export default Object.freeze({
    replacer,
    transform_geojson
});