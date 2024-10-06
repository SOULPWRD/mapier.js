// dialog.js
// Martin Pravda
// Main container for rendering dialogs

/*jslint browser */

import make_ui from "./ui.js";
import dom from "./dom.js";

function render_css({visibility}) {
    const display = (
        visibility
        ? "block;"
        : "none;"
    );

    return `
        :host {
            display: ${display}
        }`;
}

const dialog_ui = make_ui("dialog-ui", function (element, {
    on_close,
    visibility
}) {
    let close_button;
    let dialog_container;
    const style = dom("style");
    const shadow = element.attachShadow({mode: "closed"});

    function close() {
        style.textContent = render_css({visibility: false});
        dialog_container.innerHTML = "";
    }

    function open(content) {
        style.textContent = render_css({visibility: true});
        dialog_container.append(content);
    }

    close_button = dom("button", {
        onclick: function (event) {
            event.preventDefault();
            on_close();
        }
    }, ["Close"]);

    dialog_container = dom("div");

    shadow.append(style, close_button, dialog_container);

    element.open = open;
    element.close = close;

    return {
        connect() {
            style.textContent = render_css({visibility});
        },
        disconnect() {
            close();
        }
    };

});

//demo import demo from "./demo.js";
//demo const dialog = dialog_ui({
//demo     on_close: function on_close() {
//demo         dialog.close();
//demo         setTimeout(function () {
//demo             dialog.open(dom("div", ["Content"]));
//demo         }, 1000);
//demo     },
//demo     visibility: true
//demo });
//demo
//demo demo(dialog);

export default Object.freeze(dialog_ui);


