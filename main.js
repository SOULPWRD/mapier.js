// main.js
// Martin Pravda

// The main entry point for the app

import map_ui from "./map.js";
import make_ui from "./ui.js";

const app = make_ui("main-app", function (element) {

    function mount(target) {
        document.querySelector(target).append(element)
    }

    element.append(map_ui())

    element.mount = mount;

    return element;
});

app().mount("#root");