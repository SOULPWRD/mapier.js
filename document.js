// document.js
// Martin Pravda

/*jslint browser */

function create_html({
    app_code,
    state
}) {
    return `
        <!DOCTYPE HTML>
        <html>
            <body>
                <div id="root"></div>
                <script type="module" data-app="application">${app_code}</script>
                <script type="application/json" data-app="store">${state}</script>
            </body>
        </html>
    `;
}

export default Object.freeze(create_html);