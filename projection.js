// projection.js
// Martin Pravda
// An entry point for all available EPSG projections

/*jslint browser */

import proj4 from "proj4";
import {get} from "ol/proj.js";
import {register} from "ol/proj/proj4.js";

const get_projection = get;

const projections = [
    {
        code: "EPSG:27700",
        def: "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs"
    },
    {
        code: "EPSG:5514",
        def: "+proj=krovak +lat_0=49.5 +lon_0=24.8333333333333 +alpha=30.2881397527778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=589,76,480,0,0,0,0 +units=m +no_defs +type=crs"
    },
    {
        code: "EPSG:4258",
        def: "+proj=longlat +ellps=GRS80 +no_defs +type=crs"
    }
];

function register_projection({
    code,
    def,
    extent
}) {
    if (projections.find(function (projection) {
        return projection.code === code;
    })) {
        return;
    }

    proj4.defs(code, def);
    register(proj4);
    const projection = get_projection(code);
    if (extent) {
        projection.getExtent();
    }
}

function register_projections() {
    projections.forEach(function ({
        code,
        def,
        extent
    }) {
        proj4.defs(code, def);
        register(proj4);
        const projection = get_projection(code)
        projection.setExtent(extent);
    });
}

export default Object.freeze({
    register_projection,
    register_projections
});