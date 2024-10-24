// factories.js
// Martin Pravda
// Hash maps of different factory functions

/*jslint browser */

import Point from "ol/geom/Point.js";
import LineString from "ol/geom/LineString.js";
import Polygon from "ol/geom/Polygon.js";
import MultiPolygon from "ol/geom/MultiPolygon.js";

function constructor_to_factory(Geometry_Constructor) {
    return function constructor(...args) {
        return new Geometry_Constructor(...args);
    };
}

const geometries_map = {
    linestring: constructor_to_factory(LineString),
    multipolygon: constructor_to_factory(MultiPolygon),
    point: constructor_to_factory(Point),
    polygon: constructor_to_factory(Polygon)
};

function get_geometry_factory(type) {
    return geometries_map[type];
}

export default Object.freeze({
    get_geometry_factory
});

