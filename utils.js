// utils.js
// Martin Pravda

/*jslint browser */

/*global
    atob, btoa
*/

function base64_to_bytes(base64) {
    const binary_string = atob(base64);
    return Uint8Array.from(binary_string, function (m) {
        return m.codePointAt(0);
    });
}

function bytes_to_base64(bytes) {
    const binary_string = Array.from(bytes, function (byte) {
        return String.fromCodePoint(byte);
    }).join("");

    return btoa(binary_string);
}

export default Object.freeze({
    base64_to_bytes,
    bytes_to_base64
});