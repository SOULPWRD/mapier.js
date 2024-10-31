// gdal.js
// Martin Pravda

/*jslint browser */
import init_gdaljs from "gdal3.js";
import parseq from "./parseq.js";

const sources = {
    data: "https://cdn.jsdelivr.net/npm/gdal3.js@2.8.1/dist/package/gdal3WebAssembly.data",
    js: "https://cdn.jsdelivr.net/npm/gdal3.js@2.8.1/dist/package/gdal3.js",
    wasm: "https://cdn.jsdelivr.net/npm/gdal3.js@2.8.1/dist/package/gdal3WebAssembly.wasm"
};

function load_worker() {
    return function (callback) {
        return fetch(sources.js).then(function (response) {
            return response.blob();
        }).then(function (blob) {
            return callback(
                URL.createObjectURL(blob)
            );
        }).catch(function (err) {
            callback(undefined, err);
        });
    };
}

function init_gdal() {
    return function (callback, worker_url) {
        const paths = Object.assign({}, sources, {js: worker_url});
        init_gdaljs({paths}).then(function (gdal) {
            return callback(gdal);
        }).catch(function (err) {
            return callback(undefined, err);
        });
    };
}

function load() {
    return parseq.sequence([
        load_worker(),
        init_gdal()
    ]);
}

export default Object.freeze({load});

