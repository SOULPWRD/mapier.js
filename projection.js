// projection.js
// Martin Pravda
// An entry point for all available EPSG projections

/*jslint browser */

import proj4 from "proj4";
import {register} from "ol/proj/proj4";

const projections_map = {
    "EPSG:27700": "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs",
    "ESPG:4258": "+proj=longlat +ellps=GRS80 +no_defs +type=crs"
};

function register_projection(code, srs_key) {
    if (projections_map[code] !== undefined) {
        return;
    }

    proj4.defs(code, srs_key);
    register(proj4);
}

function register_projections() {
    Object.entries(projections_map).forEach(function ([
        code,
        srs_key
    ]) {
        proj4.defs(code, srs_key);
    });

    register(proj4);
}

export default Object.freeze({
    register_projection,
    register_projections
});