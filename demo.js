// demo.js
// Martin Pravda

// A demo component for rendering element in the dom

/*jslint browser */

import dom from "./dom.js";

function demo(element) {
    document.documentElement.innerHTML = "";
    document.body.append(dom(element));
}

export default Object.freeze(demo);