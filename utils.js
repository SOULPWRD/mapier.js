// utils.js
// Martin Pravda

/*jslint browser */

/*global
    atob
*/

function base64_to_typed_array(string) {
    return Uint8Array.from(atob(string), function (c) {
        return c.charCodeAt(0);
    });
}

function base64_to_url(string, type) {
    return URL.createObjectURL(
        new Blob([base64_to_typed_array(string)], {type})
    );
}

export default Object.freeze({
    base64_to_typed_array,
    base64_to_url
});