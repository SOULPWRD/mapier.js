// logger.js
// Martin Pravda

// Main logger

import {createLogger} from "bunyan";

const logger = createLogger({name: "mapier"});

function create_logger(options) {
    return logger.child(options);
}

export default Object.freeze(create_logger);